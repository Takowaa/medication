import { configureStore } from '@reduxjs/toolkit'
import medicationReducer from '../store/slice/slice'
import {useDispatch} from "react-redux";
export const store = configureStore({
    reducer: {
        medication: medicationReducer
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch