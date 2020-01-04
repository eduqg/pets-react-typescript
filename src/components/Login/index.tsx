import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';


import api from '../../services/api';

interface IProps {}

interface IState {}

type Props = IProps & RouteComponentProps;


function Login({ history }: Props) {
  useEffect(() => {
    if (localStorage.getItem('tokenAdopets')) {
      history.push('/petlist');
      console.log('You are already logged in');
    }
  }, []); // eslint-disable-line


  function login() {
    async function getBearerToken() {
      try {
        const response = await api.post('v1/auth/session-request ', {
          "system_api_key": process.env.REACT_APP_MY_ADOPETS_KEY //eslint-disable-line
        });
        if (response.data.data.access_key) {
          localStorage.setItem('tokenAdopets', response.data.data.access_key);
          console.log('Welcome!');
          history.push('/petlist');
        } else {
          console.log('Error requesting token');
        }
      } catch (error) {
        console.log(error);
      }
    }

    getBearerToken();
  }

  return (
    <>
      <h1>Login page</h1>
      <button type="button" onClick={login}>Login</button>
    </>
  );
}

export default Login;
