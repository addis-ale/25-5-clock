import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  breakLength: number;
  sessionLength: number;
  time: number;
  isBreak: boolean;
}

const initialState: InitialState = {
  breakLength: 5,
  sessionLength: 25,
  time: 25 * 60,
  isBreak: false, // ✅ New flag to track break time
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    breakLengthInc: (state) => {
      if (state.breakLength < 60) state.breakLength++;
    },
    breakLengthDec: (state) => {
      if (state.breakLength > 1) state.breakLength--; // Prevents going to 0
    },
    sessionLengthInc: (state) => {
      if (state.sessionLength < 60) {
        state.sessionLength++;
        state.time = state.sessionLength * 60; // ✅ Update `time`
      }
    },
    sessionLengthDec: (state) => {
      if (state.sessionLength > 1) {
        // Prevents going to 0
        state.sessionLength--;
        state.time = state.sessionLength * 60; // ✅ Update `time`
      }
    },
    timeDec: (state) => {
      if (state.time > 0) {
        state.time--; // ✅ Decrease time normally
      } else {
        // Switch between session and break when timer reaches 0
        if (state.isBreak) {
          state.isBreak = false; // Switch to session
          state.time = state.sessionLength * 60;
        } else {
          state.isBreak = true; // Switch to break
          state.time = state.breakLength * 60;
        }
      }
    },
    reset: (state) => {
      state.sessionLength = 25;
      state.breakLength = 5;
      state.time = 25 * 60;
      state.isBreak = false;
    },
  },
});

export const {
  breakLengthInc,
  breakLengthDec,
  sessionLengthInc,
  sessionLengthDec,
  timeDec,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;
