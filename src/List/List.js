import { Pagination, Spin, Alert } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getArticles, getArticlesToken, newPage } from '../store/articlesSlice.js';
import Card from '../Card/Card.js';

import styles from './List.module.scss';

export default function List() {
  const { loading, error, articles, totalPages, page } = useSelector((store) => store.articles);
  const { isLoggedIn, token } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) dispatch(getArticles(page));
    if (isLoggedIn) dispatch(getArticlesToken([token, page]));
  }, [page, isLoggedIn]);

  let content;
  if (error) content = <Alert type="error" message="We have a problem" className={styles.alert} />;
  else {
    content = (
      <section className={styles.blog}>
        {loading && <Spin className={styles.spin} />}
        <ul className={styles.list}>
          {Boolean(articles) && articles.map((article) => <Card article={article} key={article.slug} />)}
        </ul>
        <Pagination
          className={styles.pagination}
          align="center"
          onChange={(page) => dispatch(newPage(page))}
          total={totalPages}
          pageSize="5"
          current={page}
          showSizeChanger={false}
        />
      </section>
    );
  }

  return content;
}
