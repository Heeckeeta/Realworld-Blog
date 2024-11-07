import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api.js';

export const getArticle = createAsyncThunk('article/getArticle', async function (slug) {
  const res = await api.getArticle(slug);
  return res;
});

export const getArticleToken = createAsyncThunk('article/getArticleToken', async function (data) {
  const res = await api.getArticleToken(data);
  return res;
});

export const deleteArticle = createAsyncThunk('article/deleteArticle', async function (data) {
  const res = await api.deleteArticle(data);
  return res;
});

export const favoriteArticle = createAsyncThunk('article/favoriteArticle', async function (data) {
  const res = await api.favoriteArticle(data);
  return res;
});

export const unfavoriteArticle = createAsyncThunk('article/unfavoriteArticle', async function (data) {
  const res = await api.unfavoriteArticle(data);
  return res;
});

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    loading: true,
    error: false,
    article: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.article = action.payload;
        }
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.error = true;
        } else {
          state.error = false;
        }
      })
      .addCase(getArticleToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticleToken.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.article = action.payload;
        }
      })
      .addCase(favoriteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.article = action.payload;
        }
      })
      .addCase(unfavoriteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.article = action.payload;
        }
      });
  },
});

export default articleSlice.reducer;
export const { didDelete } = articleSlice.actions;
