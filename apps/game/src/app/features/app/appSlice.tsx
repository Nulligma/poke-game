import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { pokemonTabs } from "../../../utils/constants";

const initialState: AppTypeInitialState = {
  isLoading: true,
  userInfo: undefined,
  toasts: [],
  currentPokemonTab: pokemonTabs.description,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUserStatus: (
      state,
      action: PayloadAction<{ email: string } | undefined>
    ) => {
      state.userInfo = action.payload;
    },
    setToast: (state, action: PayloadAction<string>) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    setPokemonTab: (state, action) => {
      state.currentPokemonTab = action.payload;
    },
  },
});

export const {
  setLoading,
  setUserStatus,
  setToast,
  clearToasts,
  setPokemonTab,
} = appSlice.actions;

export default appSlice.reducer;

interface AppTypeInitialState {
  isLoading: boolean;
  userInfo: undefined | { email: string };
  toasts: string[];
  currentPokemonTab: string;
}
