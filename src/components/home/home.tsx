import React, { useEffect } from 'react';
import {
  Avatar,
  Card, Col, Layout, Row,
} from 'antd';
import Header from '../../layout/header';
import SearchBar from '../search/searchBar';
import { useAppDispatch } from '../../hooks/app';
import { fs } from '../../firebase';
import { handleAsyncAwait } from '../../helpers/app';
import { iProfile } from '../../interfaces/global';

const Home: React.FC = () => {
  const [doctors, setDoctors] = React.useState<iProfile[]>([]);
  const getDoctors = async () => handleAsyncAwait(fs
    .collection('profiles')
    .where('role', '==', 'doctor')
    // .where('isActive', '==', true)
    .get());
  useEffect(() => {
    getDoctors().then(([response, error]) => {
      const docs:iProfile[] = [];
      response.docs.forEach((doc:any) => {
        docs.push(doc.data());
      });
      setDoctors([...docs]);
    }).catch((e) => {
      console.log(e);
    });
  }, []);
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <Row justify="center">
          <Col span="22">
            <SearchBar />
          </Col>
        </Row>
        <Row justify="center">
          <Col span="22">
            <h1>Doctors</h1>
            <Row gutter={16}>
              {doctors.map((doctor) => (
                <Col xs={12} lg={6} md={8}>
                  <Card title={doctor.name}>
                    <Card.Meta
                      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title="Dentist"
                      description="Here goes more info"
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Home;
