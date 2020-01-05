import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import {
  Button, Layout, Menu, Icon,
} from 'antd/es';

import api from '../../services/api';

const {
  Header, Content, Footer, Sider,
} = Layout;

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
    console.log('Meus pets');
    console.log(pets);
  }, [pets]);


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
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="bar-chart" />
            <span className="nav-text">nav 4</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="cloud-o" />
            <span className="nav-text">nav 5</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="appstore-o" />
            <span className="nav-text">nav 6</span>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="team" />
            <span className="nav-text">nav 7</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="shop" />
            <span className="nav-text">nav 8</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{
            padding: 24, background: '#fff', textAlign: 'center', minHeight: '80vh',
          }}
          >
            <ul>
              {pets
                ? (pets.map((pet) => (
                  <li key={pet.id}>{pet.name}</li>
                ))) : (
                  <h4>Sem resultados</h4>
                )}
            </ul>
            <Button type="primary">Button</Button>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
