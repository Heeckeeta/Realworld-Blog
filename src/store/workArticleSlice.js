import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api.js';

export const setArticle = createAsyncThunk('workArticle/setArticle', async function (data) {
  const res = await api.setArticle(data);
  return res;
});

export const updateArticle = createAsyncThunk('workArticle/updateArticle', async function (data) {
  const res = await api.updateArticle(data);
  return res;
});

const workArticle = createSlice({
  name: 'workArticle',
  initialState: {
    loading: false,
    globalError: false,
    error: false,
    slug: null,
  },
  reducers: {
    openPage(state) {
      state.slug = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(setArticle.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.globalError = true;
        } else {
          state.globalError = false;
          if (action.payload[0] === 'ok') {
            state.error = false;
            state.slug = action.payload[1].slug;
          } else {
            state.error = action.payload[1];
          }
        }
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.globalError = true;
        } else {
          state.globalError = false;
          if (action.payload[0] === 'ok') {
            state.error = false;
            state.slug = action.payload[1].slug;
          } else {
            state.error = action.payload[1];
          }
        }
      });
  },
});

export default workArticle.reducer;
export const { openPage } = workArticle.actions;
