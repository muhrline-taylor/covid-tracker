import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    vaccineData: []
};

const vaccinationsSlice = createSlice({
    name: "vaccinations",
    initialState,
    reducers: {
        setVaccinationData: (state, action) => {
            state.vaccineData.push(action.payload)
        },
        clearVaccinationData: (state) => {
            state.vaccineData = [];
        }
    },
})

export const { setVaccinationData, clearVaccinationData } = vaccinationsSlice.actions;

export const selectVaccinationData = state => state.vaccines.vaccineData;

export default vaccinationsSlice.reducer;