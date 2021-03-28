import { configureStore } from '@reduxjs/toolkit';
import recentsReducer from "../features/recentsSlice";
import vaccinationsReducer from '../features/vaccinationsSlice';

export default configureStore({
    reducer: {
        recents: recentsReducer,
        vaccines: vaccinationsReducer,
    },
});