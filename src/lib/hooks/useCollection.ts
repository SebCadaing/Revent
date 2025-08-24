import { FirestoreError, getDocs, onSnapshot, QueryDocumentSnapshot, QuerySnapshot, type DocumentData } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { setCollection, setError, setLoading } from "../firebase/firestoreSlice";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { toast } from "react-toastify";
import { convertTimestamps } from "../util/util";
import { getQuery } from "../firebase/getQuery";
import type { CollectionOptions } from "../types";

type Options = {
  path: string;
  listen?: boolean;
  collectionOptions?: CollectionOptions;
  paginate?: boolean;
};
export const useCollection = <T extends DocumentData>({ path, listen = true, collectionOptions, paginate }: Options) => {
  const dispatch = useAppDispatch();
  const collectionData = useAppSelector((state) => state.firestore.collections[path]) as T[];
  const loading = useAppSelector((state) => state.firestore.loading);
  const options = useAppSelector((state) => state.firestore.options[path]);
  const loadedInitial = useRef(false);
  const lastDocRef = useRef<QueryDocumentSnapshot | null>(null);
  const hasMore = useRef(false);

  const setUpQuery = useCallback(() => {
    dispatch(setLoading(true));

    const optionsToUse = options || collectionOptions;
    if (optionsToUse?.pageNumber === 1) {
      lastDocRef.current = null;
      hasMore.current = false;
    }

    return getQuery(path, optionsToUse, lastDocRef.current, paginate);
  }, [collectionOptions, dispatch, path, options, paginate]);

  const processSnapshot = useCallback(
    (snapshot: QuerySnapshot) => {
      const data: T[] = [];
      snapshot.forEach((doc) => {
        const converted = convertTimestamps(doc.data() as T);
        data.push({ id: doc.id, ...(converted as T) });
      });
      const optionToUse = options || collectionOptions;
      if (paginate && optionToUse?.limit) {
        lastDocRef.current = snapshot.docs[snapshot.docs.length - 1];
        hasMore.current = !(snapshot.docs.length < optionToUse.limit);
      }

      dispatch(setCollection({ path, data, paginate }));
      dispatch(setLoading(false));
      loadedInitial.current = true;
    },
    [dispatch, path, collectionOptions, options, paginate]
  );

  const handleSnapshotError = useCallback(
    (error: FirestoreError) => {
      console.log(error);
      dispatch(setLoading(false));
      dispatch(setError(error.message));
      toast.error(error.message);
      loadedInitial.current = true;
    },
    [dispatch]
  );

  const subscribeToCollection = useCallback(() => {
    if (!listen || paginate) return () => {}; //no-op

    const query = setUpQuery();

    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        processSnapshot(snapshot);
      },
      (error) => {
        handleSnapshotError(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [handleSnapshotError, processSnapshot, setUpQuery, listen, paginate]);

  const fetchCollection = useCallback(() => {
    if (listen) return;
    const query = setUpQuery();
    getDocs(query)
      .then((snapshot) => processSnapshot(snapshot))
      .catch((error) => handleSnapshotError(error));
  }, [listen, setUpQuery, handleSnapshotError, processSnapshot]);

  useSyncExternalStore(subscribeToCollection, () => collectionData);
  useEffect(() => {
    if (listen || (paginate && !options)) return;
    fetchCollection();
  }, [fetchCollection, listen, options, paginate]);
  return { data: collectionData, loading, loadedInitial: loadedInitial.current, hasMore: hasMore.current };
};
