import { createSlice } from '@reduxjs/toolkit'
import {medicationListAction} from "./action.tsx";

export interface Medication {
    id: number;
    name: string;
    description: string;
    performed: number;
    target: number

}
export interface MedicationState {
    medication: Medication[]
}

const initialState: MedicationState = {
    medication: [],
}

export const medicationSlice = createSlice({
    name: 'medication',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(medicationListAction.fulfilled, (state, action) =>{
                state.medication = action.payload
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = medicationSlice.actions

export default medicationSlice.reducer