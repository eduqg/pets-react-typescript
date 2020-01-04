import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps {}

interface IState {}

type Props = IProps & RouteComponentProps;


function Login({ history }: Props) {
  useEffect(() => {
    console.log('Login');
  }, []);

  function login() {
    history.push('/petlist');
  }

  return (
    <>
      <h1>Login page</h1>
      <button type="button" onClick={login}>Login</button>
    </>
  );
}

export default Login;
