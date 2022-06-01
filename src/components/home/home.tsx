import React from 'react';
import { Col, Layout, Row } from 'antd';
import Header from '../../layout/header';
import SearchBar from '../search/searchBar';
import { useAppSelector } from '../../hooks/app';
import PatientHome from './patientHome';

const Home: React.FC = () => {
  const { profile } = useAppSelector((state) => state);
  return (
    <>
      <Row justify="center" className="m-t-2">
        <Col span="16">
          <SearchBar />
        </Col>
      </Row>
      {profile.role !== 'doctor' && <PatientHome />}
    </>
  );
};
export default Home;
