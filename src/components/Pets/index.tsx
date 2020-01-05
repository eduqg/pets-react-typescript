import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Layout, Icon } from 'antd/es';

import {
  CustomContent, CustomSider, CustomFooter, CustomMenu, MenuItem,
} from './styles';

import api from '../../services/api';

interface IPet {
  name: string,
  id: number,
}

interface IPetArray {
  petlist: IPet[]
}

type Props = RouteComponentProps & IPetArray;


export default function Pets({ history, petlist }: Props) {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState(petlist);

  const [sort, setSort] = useState(false);

  useEffect(() => {
    // async function loadInitialPets() {
    //   setLoading(true);
    //   try {
    //     const loggedToken = localStorage.getItem('userTokenAdopets');

    //     if (loggedToken) {
    //       const response = await api.post('v1/pet/search', {
    //         search: {
    //           sex_key: 'MALE',
    //           size_key: 'S',
    //           age_key: 'ADULT',
    //         },
    //         options: {
    //           sort: ['-name'],
    //         },
    //       }, {
    //         headers: {
    //           Authorization: `${loggedToken}`,
    //         },
    //       });

    //       console.log(response.data.data);
    //       setPets(response.data.data.result);
    //     } else {
    //       console.log('Token not provided');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // loadInitialPets();

    // setLoading(false);
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

  return (
    <Layout>
      <CustomSider>
        <div className="logo" />
        <CustomMenu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <MenuItem key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </MenuItem>
          <MenuItem key="2">
            <Icon type="appstore-o" />
            <span className="nav-text">nav 6</span>
          </MenuItem>
        </CustomMenu>
      </CustomSider>
      <Layout style={{ minHeight: '100vh' }}>
        <CustomContent>
          <ul>
            {pets
              ? (pets.map((pet) => (
                <li key={pet.id}>{pet.name}</li>
              ))) : (
                <h4>Sem resultados</h4>
              )}
          </ul>
        </CustomContent>
        <CustomFooter style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</CustomFooter>
      </Layout>
    </Layout>
  );
}
