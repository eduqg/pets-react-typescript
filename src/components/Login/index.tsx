import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';


import api from '../../services/api';

interface IProps {}

type Props = IProps & RouteComponentProps;


export default function Login({ history }: Props) {
  const [loading, setLoading] = useState(false);

  const [allowEnter, setAllowEnter] = useState(false);

  async function login() {
    setLoading(true);
    try {
      const initialResponse = await api.post('v1/auth/session-request ', {
          "system_api_key": process.env.REACT_APP_MY_ADOPETS_KEY //eslint-disable-line
      });

      if (initialResponse.data.data.access_key) {
        const initialToken = initialResponse.data.data.access_key;
        console.log(initialToken);

        const sessionResponse = await api.post('v1/auth/session-register', {
          organization_user: {
            email: 'usuario-test@adopets.com',
            password: '123123',
          },
        }, {
          headers: {
            Authorization: `${initialToken}`,
          },
        });

        if (sessionResponse.data.data.access_key) {
          localStorage.setItem('userTokenAdopets', sessionResponse.data.data.access_key);
          console.log(sessionResponse.data.data.access_key);
          setAllowEnter(true);
        } else {
          console.log('Error getting user token', sessionResponse);
        }
      } else {
        throw new Error('Failed to get token');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function enter() {
    history.push('/pets');
  }

  return (
    <div style={{ background: 'lightyellow' }}>
      <h1>Login</h1>
      {loading && (
        <h3>Loading...</h3>
      )}
      {allowEnter
        ? (
          <>
            Logado!
            <button type="button" onClick={enter}>Enter</button>
          </>

        )
        : (
          <>
            Clique em login para iniciar!
            <button type="button" onClick={login}>Login</button>
          </>
        )}

    </div>
  );
}
