import { configureStore } from "@reduxjs/toolkit";
import { counterSLice } from "../../feature/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { eventSLice } from "../../feature/events/eventSlice";
import { accountSlice } from "../../feature/account/accountSlice";
import { firestoreSlice } from "../firebase/firestoreSlice";
import { followSlice } from "../../feature/profiles/followSlice";

export const store = configureStore({
  reducer: {
    counter: counterSLice.reducer,
    event: eventSLice.reducer,
    account: accountSlice.reducer,
    firestore: firestoreSlice.reducer,
    follow: followSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
