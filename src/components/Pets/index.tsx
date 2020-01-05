import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Layout, Icon, Dropdown, Button, Menu,
} from 'antd/es';

import ControlPagination from '../ControlPagination';

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
  const [pets, setPets] = useState(petlist || []);

  const [sort, setSort] = useState('name');
  const [male, setMale] = useState('MALE');

  const [nextPageCount, setNextPageCount] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(1);

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
              age_key: ['ADULT', 'SENIOR'],
            },
            options: {
              sort: [sort],
              page,
            },
          }, {
            headers: {
              Authorization: `${loggedToken}`,
            },
          });

          console.log(response.data.data);
          setPets(response.data.data.result);
          setNumberOfPages(response.data.data.pages);
        } else {
          console.log('Token not provided');
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    loadInitialPets();

  }, [male, sort, page]); // eslint-disable-line

  function handleChangePage(newPage: number) {
    // Page backwards
    if (newPage < page && newPage > 0) {
      console.log('Voltar');
      setPage(newPage);
    }

    // Page forward
    if (newPage > page && page < numberOfPages) {
      console.log('avancar');
      setPage(newPage);
    }
  }

  return (
    <Layout>
      <CustomSider>
        <div className="logo" />
        <h3>
          NumberOfPages:
          {numberOfPages}
        </h3>
        <h3>
          Page:
          {page}
        </h3>
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

            {Object.keys(pets).length
              ? (pets.map((pet) => (
                <li key={pet.id}>
                  <PetCard>
                    <PetItem>{pet.name}</PetItem>
                    <PetItem>{pet.sex_key}</PetItem>
                    <PetItem>{pet.age_key}</PetItem>
                    <PetItem>{pet.size_key}</PetItem>
                    <PetItem>{pet.price}</PetItem>
                  </PetCard>


                </li>
              ))) : (
                <li>Sem resultados</li>
              )}
          </ul>

          <ControlPagination
            pageBeforeLast={numberOfPages === page}
            page={page}
            handleChangePage={handleChangePage}
          />


        </CustomContent>
        <CustomFooter style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</CustomFooter>
      </Layout>
    </Layout>
  );
}
