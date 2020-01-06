import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Layout, Button, Menu,
} from 'antd/es';

import ControlPagination from '../ControlPagination';

import logo from '../../assets/pet.png';
import goodboy from '../../assets/goodboy.png';
import {
  CustomContent, CustomSider, CustomFooter, Loading, SiderImage, ButtonsTop,
  PetList, Card, CardHeader, CardImage, CardMiddle, PetName, PetPrice, CardBottom, PetSubitem,
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

  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(1);

  /**
   * Load and filter pets
   */
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
          history.push('/');
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    loadInitialPets();

  }, [male, sort, page]); // eslint-disable-line

  /**
   * Pagination page control
   */
  function handleChangePage(newPage: number) {
    // Page backwards
    if (newPage < page && newPage > 0) {
      setPage(newPage);
    }

    // Page forward
    if (newPage > page && page < numberOfPages) {
      setPage(newPage);
    }
  }

  return (
    <Layout>

      <CustomSider>
        <div className="logo" />
        <SiderImage src={logo} alt="logo" />
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px', background: 'rgb(206, 63, 113)' }}
        >
          <Menu.Item key="1" onClick={() => history.push('/')}>Login Page</Menu.Item>
          <Menu.Item key="2">Pet List</Menu.Item>
        </Menu>
      </CustomSider>

      <Layout style={{ minHeight: '100vh' }}>
        <CustomContent>
          <Loading src={logo} loading={loading ? 'infinite' : '0'} />

          <ButtonsTop>
            {sort === 'name' ? <Button type="primary" onClick={() => setSort('-name')}>Name Descending</Button> : <Button type="danger" onClick={() => setSort('name')}>Name Ascending</Button>}
            {male === 'MALE' ? <Button type="primary" onClick={() => setMale('FEMALE')}>Select Female</Button> : <Button type="danger" onClick={() => setMale('MALE')}>Select Male</Button>}
          </ButtonsTop>

          <PetList>
            {Object.keys(pets).length
              ? (pets.map((pet) => (
                <Card key={pet.id}>
                  <CardHeader>
                    <CardImage src={goodboy} />
                    <CardMiddle>
                      <PetName>
                        {pet.name}
                      </PetName>
                    </CardMiddle>
                    <PetPrice>
                      R$
                      {pet.price}
                    </PetPrice>
                  </CardHeader>


                  <CardBottom>
                    <PetSubitem>{`Age: ${pet.age_key}`}</PetSubitem>
                    <PetSubitem>{`Sex: ${pet.sex_key}`}</PetSubitem>
                    <PetSubitem>{`Size: ${pet.size_key}`}</PetSubitem>
                  </CardBottom>
                </Card>


              ))) : (
                <li style={{ marginTop: '16px' }}>Sem resultados</li>
              )}

          </PetList>


          {/* <ul>
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
                <li style={{ marginTop: '16px' }}>Sem resultados</li>
              )}
          </ul> */}

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
