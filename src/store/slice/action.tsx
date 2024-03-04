import { createAsyncThunk } from '@reduxjs/toolkit'
import  axios from "axios";

export const medicationListAction = createAsyncThunk("medication/medicationList",
    async () => {
        const response = await axios.get('https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication')
        return response.data
})

export const medicationListAdd = createAsyncThunk("medication/medicationListAdd",
    async (medication) => {
            const response = await axios.post(`https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication`,medication)
            return response.data
})

export const medicationListDelete = createAsyncThunk("medication/medicationListAddDelete",
    async (id) => {
        const response = await axios.delete(`https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication/test1${id}`)
        return response.data
    })

export const medicationListUpdate = createAsyncThunk("medication/medicationListUpdate",
    async ({id,performed}) => {
        const response = await axios.patch(`https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication/test${id}`,{performed},{ headers: { 'Content-Type': 'application/json' }, })
        return response.data
    })