import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logOut, willEdit } from '../store/accountSlice.js';
import { openPage } from '../store/workArticleSlice.js';

import styles from './Header.module.scss';

export default function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, username, image } = useSelector((store) => store.account);
  let content;
  if (!isLoggedIn) {
    content = (
      <div className={styles.header__linksOut}>
        <Link to="/sign-in" className={styles.signIn}>
          Sign In
        </Link>
        <Link to="/sign-up" className={styles.signUp}>
          Sign Up
        </Link>
      </div>
    );
  } else {
    content = (
      <div className={styles.header__linksIn}>
        <Link to="/new-article" className={styles.create} onClick={() => dispatch(openPage())}>
          Create article
        </Link>
        <Link to="/profile" className={styles.name} onClick={() => dispatch(willEdit())}>
          <p className={styles.name__name}>{username}</p>
          <img src={image ? image : undefined} alt="" className={styles.name__img} />
        </Link>
        <Link to="/" className={styles.out} onClick={() => dispatch(logOut())}>
          Log out
        </Link>
      </div>
    );
  }
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__name}>
        Realworld Blog
      </Link>
      {content}
    </header>
  );
}
