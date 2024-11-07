import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './articlesSlice.js';
import articleReducer from './articleSlice.js';
import accountReducer from './accountSlice.js';
import workArticleReducer from './workArticleSlice.js';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    account: accountReducer,
    workArticle: workArticleReducer,
  },
});
