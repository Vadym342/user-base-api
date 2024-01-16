import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserResponseDataType } from "../../types/user.types";

type UserStateType = {
  user: UserResponseDataType | null;
  isAuth: boolean;
};

const initialState: UserStateType = {
  user: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserResponseDataType>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },
});

export const { login, logOut } = userSlice.actions;

export default userSlice.reducer;
