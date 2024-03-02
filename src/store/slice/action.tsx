import { createAsyncThunk } from '@reduxjs/toolkit'
import  axios from "axios";

export const medicationListAction = createAsyncThunk("medication/medicationList",
    async () => {
        const response = await axios.get('https://656d7f61bcc5618d3c23460f.mockapi.io/api/medication')
        return response.data
})