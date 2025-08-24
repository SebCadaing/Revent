import EventCard from "./EventCard";
import { useCollection } from "../../../lib/hooks/useCollection";
import type { AppEvent } from "../../../lib/types";
import EventFilters from "./EventFilters";
import EmptyState from "../../../app/shared/EmptyState";
import { useEventFilters } from "../../../lib/hooks/useEventFilters";
import { useAppDispatch } from "../../../lib/stores/store";
import { setCollectionOptions, setNextPage } from "../../../lib/firebase/firestoreSlice";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
export default function EventDashboard() {
  const dispatch = useAppDispatch();
  const { filter, setFilter, resetFilter, collectionOptions } = useEventFilters();
  const { data: appEvents, loadedInitial, hasMore, loading } = useCollection<AppEvent>({ path: "events", listen: false, paginate: true });
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });

  const hasSetOptions = useRef(false);
  useEffect(() => {
    if (hasSetOptions.current) return;
    dispatch(setCollectionOptions({ path: "events", options: collectionOptions }));
    hasSetOptions.current = true;
  }, [dispatch, collectionOptions]);

  useEffect(() => {
    if (!appEvents || loading) return;
    if (inView && hasMore) {
      dispatch(setNextPage({ path: "events" }));
    }
  }, [dispatch, appEvents, hasMore, inView, loading]);

  if (!loadedInitial) return <div>Loading ...</div>;

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-2/3 ">
        <div className="flex flex-col gap-4">
          {!loading && appEvents?.length === 0 ? (
            <EmptyState message="No events for this filter" onReset={resetFilter} />
          ) : (
            <div className="flex flex-col gap-3">
              {appEvents?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {hasMore && <div className="h-10" ref={ref} />}
            </div>
          )}
        </div>
      </div>
      <div className="w-1/3 overflow-x-hidden sticky top-[96px] self-start">
        <EventFilters setFilter={setFilter} filter={filter} />
      </div>
    </div>
  );
}
