import { createAsyncThunk } from '@reduxjs/toolkit'
import  axios from "axios";
import {Medication} from "./slice.tsx";
import {MedicationFormData} from "../../App.tsx";

export const medicationListAction = createAsyncThunk("medication/medicationList",
    async () => {
        const response = await axios.get('https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication')
        return response.data
})

export const medicationListAdd = createAsyncThunk<Medication,MedicationFormData>("medication/medicationListAdd",
    async (medication) => {
            const response = await axios.post(`https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication`,medication)
            return response.data
})

export const medicationListDelete = createAsyncThunk<Medication, number>("medication/medicationListAddDelete",
    async (id) => {
        const response = await axios.delete(`https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication/${id}`)
        return response.data
    })

export const medicationListUpdate = createAsyncThunk<Medication ,Medication>("medication/medicationListUpdate",
    async (data) => {
        const response = await axios.put(`https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication/${data.id}`,data)
        return response.data
    })