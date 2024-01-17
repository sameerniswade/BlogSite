import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogIn: true,
  userData: null,
  allPost: [],
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload) {
        state.isLogIn = true;
        state.userData = action.payload;
      }
    },

    logout: (state, action) => {
      state.isLogIn = false;
      state.userData = null;
    },

    putAllPost: (state, action) => {
      if (action.payload) {
        state.allPost.push(action.payload);
      }
    },
    removePost: (state, action) => {
      if (action.payload) {
        state.allPost = action.payload;
      }
    },
  },
});

export const { login, logout, putAllPost, removePost } = authSlice.actions;
export default authSlice.reducer;
