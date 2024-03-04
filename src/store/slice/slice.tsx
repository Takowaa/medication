import {createSlice} from '@reduxjs/toolkit'
import {medicationListAction, medicationListAdd, medicationListDelete, medicationListUpdate} from "./action.tsx";

export interface Medication {
    id: number;
    name: string;
    description: string;
    performed: number;
    target: number;


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
    extraReducers: (builder) => {
        builder
            .addCase(medicationListAction.fulfilled, (state, action) => {
                state.medication = action.payload
            })
            .addCase(medicationListAdd.fulfilled, (state, action) => {
                state.medication = [...state.medication, action.payload]
            })
            .addCase(medicationListDelete.fulfilled, (state, action) => {
                state.medication = state.medication.filter((item) => item.id !== action.payload.id)
            })
            .addCase(medicationListUpdate.fulfilled, (state, action) => {
                state.medication = state.medication.map((el) =>{
                    if(el.id === action.payload.id){
                        return {...el, performed: action.payload.performed}
                    }
                    return  el
                })
            })
    }
})

// Action creators are generated for each case reducer function
export const {} = medicationSlice.actions

export default medicationSlice.reducer