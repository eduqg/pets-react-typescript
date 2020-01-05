import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

import logo from '../../assets/pet.png';
import {
  CustomContent, CustomFooter, CustomLayout, ContentCenter, CustomButton, CustomInput, Loading,
} from './styles';

export default function Login({ history }: RouteComponentProps) {
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

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
          setLogged(true);
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


  useEffect(() => {
    if (logged === true) {
      history.push('/pets');
    }
  }, [history, logged]);

  return (
    <CustomLayout style={{ minHeight: '100vh', background: 'rgb(206, 63, 113)' }}>
      <CustomContent>

        <ContentCenter>
          <Loading src={logo} loading={loading ? 'infinite' : '0'} />

          <CustomInput type="email" value="joaoantonio@adopets.com" disabled />
          <CustomInput type="password" value="********" disabled />

          <CustomButton type="primary" onClick={login}>Login</CustomButton>
        </ContentCenter>
      </CustomContent>

      <CustomFooter>Ant Design ©2018 Created by Ant UED</CustomFooter>
    </CustomLayout>
  );
}
