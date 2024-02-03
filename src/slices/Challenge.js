import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  challenge: null,
  editChallenge: false,
  createLoading: false,
}

const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setChallenge: (state, action) => {
      state.challenge = action.payload
    },
    setEditChallenge: (state, action) => {
      state.editChallenge = action.payload
    },
    setCreateChanllenge: (state, action) => {
      state.createLoading = action.payload
    },
    resetChanllegeState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
    },
  },
})

export const {
  setStep,
  setChallenge,
  setEditChallenge,
  setCreateChanllenge,
  resetChanllegeState,
} = challengeSlice.actions

export default challengeSlice.reducer