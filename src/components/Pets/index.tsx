import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

interface IProps {}

interface IPet {
  name: string,
  id: number,
}

interface IPetArray {
  petlist: IPet[]
}

type Props = IProps & RouteComponentProps & IPetArray;


export default function Pets({ history, petlist }: Props) {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState(petlist);

  const [sort, setSort] = useState(false);

  useEffect(() => {
    console.log('Meus pets');
    console.log(pets);
  }, [pets]);


  useEffect(() => {
    async function loadInitialPets() {
      setLoading(true);
      try {
        const loggedToken = localStorage.getItem('userTokenAdopets');

        if (loggedToken) {
          const response = await api.post('v1/pet/search', {
            search: {
              sex_key: 'MALE',
              size_key: 'S',
              age_key: 'ADULT',
            },
            options: {
              sort: ['-name'],
            },
          }, {
            headers: {
              Authorization: `${loggedToken}`,
            },
          });

          console.log(response.data.data);
          setPets(response.data.data.result);
        } else {
          console.log('Token not provided');
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadInitialPets();

    setLoading(false);
  }, []); // eslint-disable-line

  useEffect(() => {
    async function loadInitialPets() {
      setLoading(true);
      try {
        const loggedToken = localStorage.getItem('userTokenAdopets');
        const sortOption = sort ? 'name' : '-name';

        if (loggedToken) {
          const response = await api.post('v1/pet/search', {
            search: {
              sex_key: 'MALE',
              size_key: 'S',
              age_key: 'ADULT',
            },
            options: {
              sort: [sortOption],
            },
          }, {
            headers: {
              Authorization: `${loggedToken}`,
            },
          });

          console.log(response.data.data);
          setPets(response.data.data.result);
        } else {
          console.log('Token not provided');
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadInitialPets();

    setLoading(false);
  }, [sort]); // eslint-disable-line

  function verDados() {
    console.log(pets);
  }


  return (
    <div style={{ background: 'lightblue' }}>
      <h1>All pets page</h1>
      {loading && <h4>Loading</h4>}
      <button type="button" onClick={verDados}>Ver Pets</button>
      <button type="button" onClick={() => setSort(!sort)}>Mudar Ordem</button>
      <ul>
        {pets
          ? (pets.map((pet) => (
            <li key={pet.id}>{pet.name}</li>
          ))) : (
            <h4>Sem resultados</h4>
          )}
      </ul>
    </div>
  );
}
