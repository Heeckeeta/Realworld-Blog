import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api.js';

export const getArticles = createAsyncThunk('articles/getArticles', async function (page) {
  const res = await api.getArticles(page);
  return res;
});

export const getArticlesToken = createAsyncThunk('articles/getArticlesToken', async function (data) {
  const res = await api.getArticlesToken(data);
  return res;
});

export const favoriteArticles = createAsyncThunk('articles/favoriteArticles', async function (data) {
  const res = await api.favoriteArticle(data);
  return res;
});

export const unfavoriteArticles = createAsyncThunk('articles/unfavoriteArticles', async function (data) {
  const res = await api.unfavoriteArticle(data);
  return res;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    loading: true,
    error: false,
    articles: null,
    totalPages: null,
    page: 1,
  },
  reducers: {
    newPage(state, action) {
      if (state.page !== action.payload) {
        localStorage.setItem('page', action.payload);
        return { ...state, page: action.payload };
      }
      return { ...state };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.totalPages = action.payload.articlesCount;
          state.articles = action.payload.articles;
        }
      })
      .addCase(getArticlesToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticlesToken.fulfilled, (state, action) => {
        if (!action.payload) {
          state.loading = false;
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          state.totalPages = action.payload.articlesCount;
          state.articles = action.payload.articles;
        }
      })
      .addCase(favoriteArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(favoriteArticles.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          if (state.articles) {
            const idx = state.articles.findIndex((el) => el.slug === action.payload.slug);
            state.articles = [
              ...state.articles.slice(0, idx),
              action.payload,
              ...state.articles.slice(idx + 1, state.articles.length),
            ];
          }
        }
      })
      .addCase(unfavoriteArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfavoriteArticles.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.error = true;
        } else {
          state.loading = false;
          state.error = false;
          if (state.articles) {
            const idx = state.articles.findIndex((el) => el.slug === action.payload.slug);
            state.articles = [
              ...state.articles.slice(0, idx),
              action.payload,
              ...state.articles.slice(idx + 1, state.articles.length),
            ];
          }
        }
      });
  },
});

export default articlesSlice.reducer;
export const { newPage } = articlesSlice.actions;
