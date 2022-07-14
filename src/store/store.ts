import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import booksSlice from "./slices/booksSlice"
import urlSlice from "./slices/urlSlice"

const store = configureStore({
    reducer:{
        urlParams:urlSlice.reducer,
        booksSlice:booksSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const {changeSettingsLink} = urlSlice.actions
export default store
