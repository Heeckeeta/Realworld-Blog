import { Spin, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { logIn } from '../store/accountSlice.js';

import styles from './SignIn.module.scss';

export default function CreateAcc() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, loading, globalError, error } = useSelector((store) => store.account);
  let [message, textError] = [null, null];
  if (error) {
    message = error.message;
    textError = error['email or password'];
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (isLoggedIn) {
      reset();
      navigate('/');
    }
  }, [isLoggedIn]);

  const onSubmit = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    dispatch(logIn(user));
  };
  return (
    <>
      {loading && <Spin className={styles.spin} />}
      {globalError ? (
        <Alert type="error" className={styles.alert} message="Something went wrong :(" />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.title}>Sign In</p>
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
              className={`${styles.label__input} ${errors?.email ? styles.label__error : ''}`}
            />
          </label>
          {errors?.email && <p className={styles.error}>{errors?.email?.message}</p>}
          <label className={styles.label}>
            <p className={styles.label__text}>Password</p>
            <input
              {...register('password', {
                required: 'This field is required',
              })}
              type="password"
              placeholder="Password"
              className={`${styles.label__input} ${errors?.password ? styles.label__error : ''}`}
            />
          </label>
          {errors?.password && <p className={styles.error}>{errors?.password?.message}</p>}
          {Boolean(textError) && <p className={styles.error}>{'email or password: ' + textError}</p>}
          {Boolean(message) && <p className={styles.error}>{message}</p>}
          <input type="submit" className={styles.submit} value="Login" disabled={!isValid || loading} />
          <p className={styles.footer}>
            Don’t have an account?{' '}
            <Link to="/sign-up" className={styles.signUp}>
              Sign Up.
            </Link>
          </p>
        </form>
      )}
    </>
  );
}
