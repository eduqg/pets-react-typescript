import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Layout, Button, Menu, Radio,
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
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({});

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
            search,
            options: {
              sort: [sort],
              page,
            },
          }, {
            headers: {
              Authorization: `${loggedToken}`,
            },
          });

          console.log({ Pages: response.data.data.pages, Count: response.data.data.count });
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

  }, [search, sort, page]); // eslint-disable-line

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

  // Prevents empty results after update search in page above 1
  useEffect(() => {
    if (Object.keys(pets).length === 0 && page >= numberOfPages) {
      setPage(1);
    }
  }, [pets]); // eslint-disable-line 

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
            <Button type="primary" onClick={() => setSearch({})}>Load All</Button>
          </ButtonsTop>

          <ButtonsTop>
            {sort === 'name' ? <Button type="default" onClick={() => setSort('-name')}>Name Descending</Button> : <Button type="primary" onClick={() => setSort('name')}>Name Ascending</Button>}
          </ButtonsTop>

          <ButtonsTop>
            <Radio.Group defaultValue="" onChange={(e) => setSearch({ ...search, sex_key: e.target.value })} buttonStyle="solid">
              <Radio.Button value="MALE">Male</Radio.Button>
              <Radio.Button value="FEMALE">Female</Radio.Button>
            </Radio.Group>
          </ButtonsTop>

          <ButtonsTop>
            <Radio.Group defaultValue="" onChange={(e) => setSearch({ ...search, size_key: e.target.value })} buttonStyle="solid">
              <Radio.Button value="S">S</Radio.Button>
              <Radio.Button value="M">M</Radio.Button>
              <Radio.Button value="L">L</Radio.Button>
              <Radio.Button value="XL">XL</Radio.Button>
              <Radio.Button value="XS">XS</Radio.Button>
            </Radio.Group>
          </ButtonsTop>

          <ButtonsTop>
            <Radio.Group defaultValue="" onChange={(e) => setSearch({ ...search, age_key: e.target.value })} buttonStyle="solid">
              <Radio.Button value="BABY">Baby</Radio.Button>
              <Radio.Button value="YOUNG">Young</Radio.Button>
              <Radio.Button value="ADULT">Adult</Radio.Button>
              <Radio.Button value="SENIOR">Senior</Radio.Button>
            </Radio.Group>
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
                <CardMiddle style={{ marginTop: '16px' }}>
                  <PetName>
                      There are no pets in this category.
                  </PetName>
                </CardMiddle>
              )}

          </PetList>

          <ControlPagination
            pageBeforeLast={numberOfPages === page || numberOfPages === 0}
            page={page}
            handleChangePage={handleChangePage}
          />

        </CustomContent>
        <CustomFooter>Ant Design ©2018 Created by Ant UED</CustomFooter>
      </Layout>
    </Layout>
  );
}
