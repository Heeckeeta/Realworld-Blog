import { Spin, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { setArticle, updateArticle } from '../store/workArticleSlice.js';

import styles from './CreateArticle.module.scss';

let key = 100;

export default function CreateAcc({ edit }) {
  const [titleValue, setTitle] = useState('');
  const [descriptionValue, setDescription] = useState('');
  const [textValue, setText] = useState('');
  const [tags, setTag] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, token, username } = useSelector((store) => store.account);
  const { article } = useSelector((store) => store.article);
  const { error, globalError, loading, slug } = useSelector((store) => store.workArticle);
  let [message, title, description, text] = [null, null, null, null];
  if (error) {
    message = error.message;
    title = error.title;
    description = error.description;
    text = error.body;
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (!isLoggedIn) navigate('/sign-in');
    if (slug) navigate(`/articles/${slug}`);
    if (edit && article && article.author && username === article.author.username) {
      setTag(article.tagList);
      setTitle(article.title);
      setDescription(article.description);
      setText(article.body);
    }
  }, [isLoggedIn, slug]);

  const addTag = () => {
    setTag([...tags, '']);
  };

  const onDelete = (idx) => {
    setTag((tags) => [...tags.slice(0, idx), ...tags.slice(idx + 1, tags.length)]);
  };

  const onSubmit = (data) => {
    const tagList = [];
    if (data.tag.trim()) tagList.push(data.tag.trim());
    for (let i = 0; i < tags.length; i++) {
      if (data[`tag${i}`].trim()) tagList.push(data[`tag${i}`].trim());
    }
    const newArticle = {
      title: data.title,
      description: data.description,
      body: data.text,
      tagList,
    };
    if (!edit) dispatch(setArticle([token, newArticle]));
    if (edit && article) dispatch(updateArticle([token, article.slug, newArticle]));
  };
  return (
    <>
      {loading && <Spin className={styles.spin} />}
      {globalError ? (
        <Alert type="error" className={styles.alert} message="Something went wrong :(" />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.title}>Create new article</p>
          <label className={styles.label}>
            <p className={styles.label__text}>Title</p>
            <input
              {...register('title', {
                required: 'This field is required',
              })}
              defaultValue={titleValue}
              placeholder="Title"
              className={`${styles.label__input} ${
                Boolean(errors?.title) || Boolean(title) ? styles.label__error : ''
              }`}
            />
          </label>
          {errors?.title && <p className={styles.error}>{errors?.title?.message}</p>}
          {Boolean(title) && <p className={styles.error}>{title}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>Short description</p>
            <input
              {...register('description', {
                required: 'This field is required',
              })}
              defaultValue={descriptionValue}
              placeholder="Short description"
              className={`${styles.label__input} ${
                Boolean(errors?.description) || Boolean(description) ? styles.label__error : ''
              }`}
            />
          </label>
          {errors?.description && <p className={styles.error}>{errors?.description?.message}</p>}
          {Boolean(description) && <p className={styles.error}>{description}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>Text</p>
            <textarea
              {...register('text', {
                required: 'This field is required',
              })}
              defaultValue={textValue}
              placeholder="Text"
              className={`${styles.label__input} ${styles.input__text} ${
                Boolean(errors?.text) || Boolean(text) ? styles.label__error : ''
              }`}
            />
          </label>
          {errors?.text && <p className={styles.error}>{errors?.text?.message}</p>}
          {Boolean(text) && <p className={styles.error}>{text}</p>}
          <p className={styles.label__text}>Tags</p>
          <div className={styles.tag__wrapper}>
            <input {...register('tag')} placeholder="Tag" className={`${styles.label__input} ${styles.tag__input}`} />
            <p className={styles.addtag} onClick={addTag}>
              Add tag
            </p>
          </div>
          {tags.map((tag, idx) => {
            return (
              <div key={key++} className={styles.tag__wrapper}>
                <input
                  {...register(`tag${idx}`)}
                  placeholder="Tag"
                  className={`${styles.label__input} ${styles.tag__input}`}
                  defaultValue={tag}
                />
                <p className={styles.delete} onClick={() => onDelete(idx)}>
                  Delete
                </p>
              </div>
            );
          })}
          {Boolean(message) && <p className={styles.error}>{message}</p>}
          <input type="submit" className={styles.submit} value="Send" disabled={!edit & (!isValid || loading)} />
        </form>
      )}
    </>
  );
}
