import { Link, useParams, useNavigate } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { format, parseISO } from 'date-fns';
import { Spin, Alert, Popconfirm } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getArticle,
  getArticleToken,
  deleteArticle,
  unfavoriteArticle,
  favoriteArticle,
} from '../store/articleSlice.js';
import { openPage } from '../store/workArticleSlice.js';

import styles from './Article.module.scss';

export default function Article() {
  const navigate = useNavigate();
  const { loading, error, article } = useSelector((store) => store.article);
  const { isLoggedIn, username, token } = useSelector((store) => store.account);
  const dispatch = useDispatch();
  const { slug } = useParams();
  useEffect(() => {
    if (!isLoggedIn) dispatch(getArticle(slug));
    if (isLoggedIn) dispatch(getArticleToken([token, slug]));
  }, [slug]);

  const onLike = () => {
    if (isLoggedIn && article.favorited) {
      dispatch(unfavoriteArticle([token, article.slug]));
    }
    if (isLoggedIn && !article.favorited) {
      dispatch(favoriteArticle([token, article.slug]));
    }
  };

  let buttons = null;
  if (article && article.author && username === article.author.username) {
    buttons = (
      <>
        <Popconfirm
          placement="rightTop"
          title="Are you sure to delete this article?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            dispatch(deleteArticle([token, article.slug]));
            setTimeout(() => navigate('/'), 700);
          }}
        >
          <div to="/" className={styles.delete}>
            Delete
          </div>
        </Popconfirm>
        <Link to={`/articles/${article.slug}/edit`} className={styles.edit} onClick={() => dispatch(openPage())}>
          Edit
        </Link>
      </>
    );
  }

  let content;
  if (loading) content = <Spin className={styles.spin} />;
  else if (error) content = <Alert type="info" message="This page not found" className={styles.alert} />;
  else {
    content = (
      <article className={styles.article}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.titleLikes}>
              <p className={styles.title}>{Boolean(article.title) && article.title.replace(/\s\s+/g, ' ')}</p>
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
                    <div className={styles.tag} key={tag}>
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
        <div className={styles.buttonsWrapper}>
          <p className={styles.pretext}>{Boolean(article.description) && article.description.replace(/\s\s+/g, ' ')}</p>
          {buttons}
        </div>
        <p className={styles.text}>
          <Markdown>{article.body}</Markdown>
        </p>
      </article>
    );
  }

  return content;
}
