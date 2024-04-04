import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STR_TOKEN } from "../helpers/common";
import { useAppSelector } from "./hooks";

// Define a type for the slice state
interface UserState {
  username?: string | null | undefined;
  email?: string | null | undefined;
  surName?: string | null | undefined;
  givenName?: string | null | undefined;
  organisationId: string;
  organisationName: string;
}

// Define the initial state using that type
const initialState: UserState = {
  organisationId: "",
  organisationName: "",
};
export const UserSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: UserState }>) => {
      state.email = action.payload.user.email;
      state.givenName = action.payload.user.givenName;
      state.surName = action.payload.user.surName;
      state.username = action.payload.user.username;
      state.organisationId = action.payload.user.organisationId;
      state.organisationName = action.payload.user.organisationName;
    },
    signOut: () => {
      sessionStorage.removeItem(STR_TOKEN);
      window.location.href = "/";
    },
  },
});

export const useUser = (): UserState => {
  const data = useAppSelector((state) => state.user);

  return data;
};

// export const user = useAppSelector((state) => state.user);

export const { setUser, signOut } = UserSlice.actions;

export default UserSlice.reducer;
