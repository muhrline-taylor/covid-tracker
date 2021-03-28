import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recentsList: []
};

const recentsSlice = createSlice({
    name: "recents",
    initialState,
    reducers: {
        saveRecent: (state, action) => {
            if(action.payload.countryCode !== "Worldwide"){
                var temp = 0;
                for(let i=0; i< state.recentsList.length; i++){
                    if(action.payload.countryCode === state.recentsList[i].countryCode){
                        temp ++
                    }
                }
                if(state.recentsList.length > 2){
                    var tempRecents = state.recentsList;
                    state.recentsList = tempRecents.slice(1)
                }
                if(temp === 0){
                    state.recentsList.push(action.payload)
                }
                
            }
            
        }
    },
})

export const { saveRecent } = recentsSlice.actions;

export const selectRecentsList = state => state.recents.recentsList;

export default recentsSlice.reducer;