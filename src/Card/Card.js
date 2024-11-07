import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';

import { unfavoriteArticles, favoriteArticles } from '../store/articlesSlice.js';

import styles from './Card.module.scss';

let key = 100;
export default function Card({ article }) {
  const { token, isLoggedIn } = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const onLike = () => {
    if (isLoggedIn && article.favorited) {
      dispatch(unfavoriteArticles([token, article.slug]));
    }
    if (isLoggedIn && !article.favorited) {
      dispatch(favoriteArticles([token, article.slug]));
    }
  };
  return (
    <li className={styles.li}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.titleLikes}>
            <Link to={`/articles/${article.slug}`} className={styles.title}>
              {Boolean(article.title) && article.title.replace(/\s\s+/g, ' ')}
            </Link>
            <form className={styles.likeForm}>
              <label className={styles.label}>
                <input type="checkbox" className={styles.like} checked={article.favorited} onChange={onLike} />
                <span className={styles.likeImg} />
                <span className={styles.countLikes}>{article.favoritesCount}</span>
              </label>
            </form>
          </div>
          <div className={styles.tags}>
            {article.tagList.map(
              (tag) =>
                Boolean(tag.trim()) && (
                  <div className={styles.tag} key={key++}>
                    {Boolean(tag) && tag.replace(/\s\s+/g, ' ')}
                  </div>
                )
            )}
          </div>
        </div>
        <div className={styles.userInfo}>
          <p className={styles.name}>{article.author.username}</p>
          <p className={styles.date}>{format(new Date(parseISO(article.createdAt)), 'MMMM dd, yyyy')}</p>
        </div>
        <div className={styles.imgWrapper}>
          <img src={article.author.image} alt="" className={styles.img} />
        </div>
      </div>
      <p className={styles.text}>{Boolean(article.description) && article.description.replace(/\s\s+/g, ' ')}</p>
    </li>
  );
}
