import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  Layout, Icon, Dropdown, Button, Menu,
} from 'antd/es';
import logo from '../../assets/pet.png';
import {
  CustomContent, CustomSider, CustomFooter, CustomMenu, MenuItem, Loading, PetCard, PetItem,
} from './styles';

import api from '../../services/api';

interface IPet {
  name: string,
  id: number,
  sex_key: string,
  size_key: string,
  age_key: string,
  price: string,
}

interface IPetArray {
  petlist: IPet[]
}

type Props = RouteComponentProps & IPetArray;


export default function Pets({ history, petlist }: Props) {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState(petlist);

  const [sort, setSort] = useState('name');
  const [male, setMale] = useState('MALE');

  useEffect(() => {
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
              sex_key: male,
              size_key: ['S', 'M', 'L', 'XL'],
              age_key: ['BABY', 'YOUNG', 'ADULT', 'SENIOR'],
            },
            options: {
              sort: [sort],
              page: 1,
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
      setLoading(false);
    }
    loadInitialPets();

  }, [male, sort]); // eslint-disable-line

  return (
    <Layout>
      <CustomSider>
        <div className="logo" />
        <CustomMenu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <MenuItem key="1">
            <Icon type="user" />
            <span className="nav-text">Login</span>
          </MenuItem>
          <MenuItem key="2">
            <Icon type="appstore-o" />
            <span className="nav-text">Login</span>
          </MenuItem>
        </CustomMenu>
      </CustomSider>
      <Layout style={{ minHeight: '100vh' }}>

        <CustomContent>

          <Loading src={logo} loading={loading ? 'infinite' : '0'} />

          <ul>
            <li>
              {sort === 'name' ? <Button type="primary" onClick={() => setSort('-name')}>Name Descending</Button> : <Button type="danger" onClick={() => setSort('name')}>Name Ascending</Button> }
              {male === 'MALE' ? <Button type="primary" onClick={() => setMale('FEMALE')}>Select Female</Button> : <Button type="danger" onClick={() => setMale('MALE')}>Select Male</Button> }
            </li>
            {pets
               && (pets.map((pet) => (
                 <li key={pet.id}>
                   <PetCard>
                     <PetItem>{pet.name}</PetItem>
                     <PetItem>{pet.sex_key}</PetItem>
                     <PetItem>{pet.age_key}</PetItem>
                     <PetItem>{pet.size_key}</PetItem>
                     <PetItem>{pet.price}</PetItem>
                   </PetCard>


                 </li>
               )))}
          </ul>


        </CustomContent>
        <CustomFooter style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</CustomFooter>
      </Layout>
    </Layout>
  );
}
