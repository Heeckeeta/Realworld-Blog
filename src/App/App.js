import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../Header/Header.js';
import List from '../List/List.js';
import Article from '../Article/Article.js';
import CreateArticle from '../CreateArticle/CreateArticle.js';
import SignIn from '../SignIn/SignIn.js';
import CreateAcc from '../CreateAcc/CreateAcc.js';
import { getByToken } from '../store/accountSlice.js';
import EditProfile from '../EditProfile/EditProfile.js';

import styles from './App.module.scss';

export default function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.account);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isLoggedIn) dispatch(getByToken(token));
  }, [isLoggedIn]);
  return (
    <main className={styles.main}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<List />} />
          <Route path="/articles" exact element={<List />} />
          <Route path="/articles/:slug" exact element={<Article />} />
          <Route path="/new-article" element={<CreateArticle edit={false} />} />
          <Route path="/articles/:slug/edit" element={<CreateArticle edit={true} />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<CreateAcc />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      </Router>
    </main>
  );
}
