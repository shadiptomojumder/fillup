import { User } from "@/interfaces/user.schemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: User | null;
    accesstoken: string | null;
    isLoading: boolean; // Initially loading user data
}

const initialState: UserState = {
    user: null,
    accesstoken: null,
    isLoading: true, // Initially loading user data
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; accesstoken: string }>) => {
            state.user = action.payload.user;
            state.accesstoken = action.payload.accesstoken;
            state.isLoading = false; // User data loaded successfully
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accesstoken = null;
            state.isLoading = false;
        },
    },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;
