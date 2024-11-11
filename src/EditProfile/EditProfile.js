import { Spin, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { editProfile } from '../store/accountSlice.js';

import styles from './EditProfile.module.scss';

export default function CreateAcc() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, edited, token, loading, globalError, error } = useSelector((store) => store.account);
  let [message, username, email, password, image] = [null, null, null, null];
  if (error) {
    message = error.message;
    username = error.username;
    email = error.email;
    password = error.password;
    image = error.image;
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/sign-in');
    if (edited) navigate('/');
  }, [isLoggedIn, edited]);

  const onSubmit = (data) => {
    const user = {
      username: data.Username,
      email: data.email,
    };
    if (data.password) user.password = data.password;
    if (data.image) user.image = data.image;
    dispatch(editProfile([token, user]));
  };
  return (
    <>
      {loading && <Spin className={styles.spin} />}
      {globalError ? (
        <Alert type="error" className={styles.alert} message="Something went wrong :(" />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.title}>Edit Profile</p>
          <label className={styles.label}>
            <p className={styles.label__text}>Username</p>
            <input
              {...register('Username', {
                required: 'This field is required',
                minLength: {
                  value: 3,
                  message: 'Username needs to be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username needs to contain no more than 20 characters',
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'You can only use lowercase English letters and numbers',
                },
              })}
              placeholder="Username"
              className={`${styles.label__input} ${errors?.Username || Boolean(username) ? styles.label__error : ''}`}
            />
          </label>
          {errors?.Username && <p className={styles.error}>{errors?.Username?.message}</p>}
          {Boolean(username) && <p className={styles.error}>{username}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>Email address</p>
            <input
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email',
                },
              })}
              placeholder="Email address"
              className={`${styles.label__input} ${errors?.email || Boolean(email) ? styles.label__error : ''}`}
            />
          </label>
          {errors?.email && <p className={styles.error}>{errors?.email?.message}</p>}
          {Boolean(email) && <p className={styles.error}>{email}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>New password</p>
            <input
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password needs to be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password needs to contain no more than 40 characters',
                },
              })}
              type="password"
              placeholder="New password"
              className={`${styles.label__input} ${errors?.password || Boolean(password) ? styles.label__error : ''}`}
            />
          </label>
          {errors?.password && <p className={styles.error}>{errors?.password?.message}</p>}
          {Boolean(password) && <p className={styles.error}>{password}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>Avatar image (url)</p>
            <input
              {...register('image', {
                pattern: {
                  value: /^(https?:\/\/[^\s]+)$/,
                  message: 'Invalid url',
                },
              })}
              placeholder="Avatar image"
              className={`${styles.label__input} ${errors?.image || Boolean(image) ? styles.label__error : ''}`}
            />
          </label>
          {errors?.image && <p className={styles.error}>{errors?.image?.message}</p>}
          {Boolean(image) && <p className={styles.error}>{image}</p>}
          {Boolean(message) && <p className={styles.error}>{message}</p>}
          <input type="submit" className={styles.submit} value="Save" disabled={!isValid || loading} />
        </form>
      )}
    </>
  );
}
