import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api.js';

export const createAcc = createAsyncThunk('account/createAcc', async function (data) {
  const res = await api.createAcc(data);
  return res;
});

export const logIn = createAsyncThunk('account/logIn', async function (data) {
  const res = await api.logIn(data);
  return res;
});

export const getByToken = createAsyncThunk('account/getByToken', async function (token) {
  const res = await api.getByToken(token);
  return res;
});

export const editProfile = createAsyncThunk('account/editProfile', async function (data) {
  const res = await api.editProfile(data);
  return res;
});

const account = createSlice({
  name: 'account',
  initialState: {
    isLoggedIn: false,
    edited: false,
    loading: false,
    globalError: false,
    error: false,
    username: null,
    email: null,
    token: null,
    image: null,
  },
  reducers: {
    logOut(state) {
      state.globalError = false;
      state.isLoggedIn = false;
      state.edited = false;
      state.error = false;
      state.username = null;
      state.email = null;
      state.token = null;
      state.image = null;
      localStorage.removeItem('token');
    },
    willEdit(state) {
      state.edited = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAcc.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAcc.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.globalError = true;
        } else {
          state.globalError = false;
          if (action.payload[0] === 'ok') {
            state.isLoggedIn = true;
            state.error = false;
            state.username = action.payload[1].username;
            state.email = action.payload[1].email;
            state.token = action.payload[1].token;
            state.image = action.payload[1].image;
            localStorage.setItem('token', action.payload[1].token);
          } else {
            state.error = action.payload[1];
          }
        }
      })
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) state.globalError = true;
        else {
          state.globalError = false;
          if (action.payload[0] === 'ok') {
            state.isLoggedIn = true;
            state.error = false;
            state.username = action.payload[1].username;
            state.email = action.payload[1].email;
            state.token = action.payload[1].token;
            state.image = action.payload[1].image;
            localStorage.setItem('token', action.payload[1].token);
          } else {
            state.error = action.payload[1];
          }
        }
      })
      .addCase(getByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByToken.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.globalError = false;
          state.edited = false;
          state.isLoggedIn = false;
          state.error = false;
          state.username = null;
          state.email = null;
          state.token = null;
          state.image = null;
          localStorage.removeItem('token');
        } else {
          state.globalError = false;
          state.isLoggedIn = true;
          state.error = false;
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.token = action.payload.token;
          state.image = action.payload.image;
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.globalError = true;
        } else {
          state.globalError = false;
          if (action.payload[0] === 'ok') {
            state.isLoggedIn = true;
            state.edited = true;
            state.error = false;
            state.username = action.payload[1].username;
            state.email = action.payload[1].email;
            state.token = action.payload[1].token;
            state.image = action.payload[1].image;
            localStorage.setItem('token', action.payload[1].token);
          } else {
            state.error = action.payload[1];
          }
        }
      });
  },
});

export default account.reducer;
export const { logOut, willEdit } = account.actions;
