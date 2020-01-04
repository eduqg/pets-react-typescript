import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps {}

interface IState {}

type Props = IProps & RouteComponentProps;


function PetList({ history }: Props) {
  useEffect(() => {
    if (!localStorage.getItem('tokenAdopets')) {
      console.log('You are not logged in');
      history.push('/');
    }
  }, []); // eslint-disable-line

  function logout() {
    localStorage.removeItem('tokenAdopets');
    history.push('/');
  }

  return (
    <>
      <h1>Pets</h1>
      <button type="button" onClick={logout}>Logout</button>
    </>
  );
}

export default PetList;
