import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Layout, Button, Menu, Checkbox, Radio,
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

const ageOptions = [
  { label: 'Baby', value: 'BABY', disabled: true },
  { label: 'Young', value: 'YOUNG' },
  { label: 'Adult', value: 'ADULT' },
  { label: 'Senior', value: 'SENIOR', disabled: true },
];

export default function Pets({ history, petlist }: Props) {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState(petlist || []);

  const [sort, setSort] = useState('name');
  const [male, setMale] = useState('MALE');
  const [ages, setAges] = useState(['YOUNG', 'ADULT']);
  const [size, setSize] = useState('S');

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
              size_key: size,
              age_key: ages,
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

  }, [male, sort, ages, size, page]); // eslint-disable-line

  /**
   * Pagination page control
   */
  function handleChangePage(newPage: number) {
    // Page backwards
    if (newPage < page && newPage > 0) {
      setPage(newPage);
    }

    // Page forward
    if (newPage > page && page <= numberOfPages) {
      setPage(newPage);
    }
  }

  /**
   * Checkbox control
   */
  function onChangePetAge(checkedValues: any) {
    // API only accepts string instead array of strings if there is only one value checked
    if (checkedValues.length === 1) {
      setAges(checkedValues[0]);
    } else {
      setAges(checkedValues);
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

          <ButtonsTop>
            <Radio.Group defaultValue="S" onChange={(e) => setSize(e.target.value)} buttonStyle="solid">
              <Radio.Button value="S">S</Radio.Button>
              <Radio.Button value="M">M</Radio.Button>
              <Radio.Button value="L">L</Radio.Button>
              <Radio.Button value="XL">XL</Radio.Button>
              <Radio.Button value="XS">XS</Radio.Button>
              <Radio.Button value={['S', 'M']}>ALL</Radio.Button>
            </Radio.Group>
          </ButtonsTop>

          <ButtonsTop>
            <Checkbox.Group options={ageOptions} defaultValue={['YOUNG', 'ADULT']} onChange={(e) => onChangePetAge(e)} />
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
