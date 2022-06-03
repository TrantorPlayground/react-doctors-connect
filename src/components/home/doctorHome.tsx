import React from 'react';
import { Row } from 'antd';
import Appointments from '../appointments/appointments';

const DoctorHome: React.FC = () => (

  <Row justify="start">
    <Appointments type="doctorId" />
  </Row>
);

export default DoctorHome;
