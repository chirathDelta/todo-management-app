import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { email: string; name: string } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      state.user = { email: action.payload.email, name: "User" };
      state.isAuthenticated = true;
    },
    login(state, action: PayloadAction<{ email: string; name: string }>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
