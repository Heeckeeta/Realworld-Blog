import { Spin, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { createAcc } from '../store/accountSlice.js';

import styles from './CreateAcc.module.scss';

export default function CreateAcc() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, loading, globalError, error } = useSelector((store) => store.account);
  let [message, username, email, password] = [null, null, null, null];
  if (error) {
    message = error.message;
    username = error.username;
    email = error.email;
    password = error.pass;
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    getValues,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (isLoggedIn) {
      reset();
      navigate('/');
    }
  }, [isLoggedIn]);

  const onSubmit = (data) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(createAcc(user));
  };
  return (
    <>
      {loading && <Spin className={styles.spin} />}
      {globalError ? (
        <Alert type="error" className={styles.alert} message="Something went wrong :(" />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.title}>Create new account</p>
          <label className={styles.label}>
            <p className={styles.label__text}>Username</p>
            <input
              {...register('username', {
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
              className={`${styles.label__input} ${
                Boolean(errors?.username) || Boolean(username) ? styles.label__error : ''
              }`}
            />
          </label>
          {errors?.username && <p className={styles.error}>{errors?.username?.message}</p>}
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
              className={`${styles.label__input} ${
                Boolean(errors?.email) || Boolean(email) ? styles.label__error : ''
              }`}
            />
          </label>
          {errors?.email && <p className={styles.error}>{errors?.email?.message}</p>}
          {Boolean(email) && <p className={styles.error}>{email}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>Password</p>
            <input
              {...register('password', {
                required: 'This field is required',
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
              placeholder="Password"
              className={`${styles.label__input} ${
                Boolean(errors?.password) || Boolean(password) ? styles.label__error : ''
              }`}
            />
          </label>
          {errors?.password && <p className={styles.error}>{errors?.password?.message}</p>}
          {Boolean(password) && <p className={styles.error}>{password}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>Repeat Password</p>
            <input
              {...register('repeatPassword', {
                required: 'This field is required',
                validate: (value) => {
                  const { password } = getValues();
                  return value === password || 'Your password does not match';
                },
              })}
              type="password"
              placeholder="Password"
              className={`${styles.label__input} ${errors?.repeatPassword ? styles.label__error : ''}`}
            />
          </label>
          {errors?.repeatPassword && <p className={styles.error}>{errors?.repeatPassword?.message}</p>}
          <label className={styles.checkbox}>
            <input
              defaultChecked
              type="checkbox"
              {...register('check', { required: 'You have to agree with it' })}
              className={styles.checkbox__base}
            />
            <span className={styles.checkbox__text}>I agree to the processing of my personal information</span>
          </label>
          {errors?.checkbox && <p className={styles.error}>{errors?.checkbox?.message}</p>}
          {Boolean(message) && <p className={styles.error}>{message}</p>}
          <input type="submit" className={styles.submit} value="Create" disabled={!isValid || loading} />
          <p className={styles.footer}>
            Already have an account?{' '}
            <Link to="/sign-in" className={styles.signIn}>
              Sign In.
            </Link>
          </p>
        </form>
      )}
    </>
  );
}
