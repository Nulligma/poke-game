import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  email: string | null;
  token: string | null;
}; 

const initialState: UserState = {
  email: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state: UserState, action: PayloadAction<UserState>) => {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
    },
    logOut: (state: UserState) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;
