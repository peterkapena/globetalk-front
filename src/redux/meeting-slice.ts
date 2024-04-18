import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import i18n from "../helpers/i18n";

// Define a type for the slice state
interface MeetingState {
  language: string;
}

// Define the initial state using that type
const initialState: MeetingState = { language: i18n.language };

export const MeetingSlice = createSlice({
  name: "meeting",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<string>) => {
       i18n.changeLanguage(action.payload)
      state.language = action.payload;
      window.location.reload()
    },
  },
});

export const useMeeting = (): MeetingState => {
  const data = useAppSelector((state) => state.meeting);
  return data;
};

export const { updateLanguage } = MeetingSlice.actions;

export default MeetingSlice.reducer;
