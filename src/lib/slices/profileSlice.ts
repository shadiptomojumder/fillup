import { IProfile } from "@/interfaces/jobProfile.schemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
    profile: Partial<IProfile>; // Partial because data fills progressively
    isSaving: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profile: {}, // start empty
    isSaving: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfileStep: (state, action: PayloadAction<Partial<IProfile>>) => {
            // Merge step data into existing profile state
            state.profile = { ...state.profile, ...action.payload };
            state.error = null;
        },
        setSaving: (state, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearProfile: (state) => {
            state.profile = {};
            state.error = null;
            state.isSaving = false;
        },
    },
});

export const { updateProfileStep, setSaving, setError, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
