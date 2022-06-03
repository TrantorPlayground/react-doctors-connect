import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { iProfile } from '../../interfaces/global';
import { handleAsyncAwait } from '../../helpers/app';
import { fs } from '../../firebase';
import DoctorsList from '../doctors/doctorsList';

const PatientHome: React.FC = () => {
  const [doctors, setDoctors] = React.useState<iProfile[]>([]);
  const getDoctors = async () => handleAsyncAwait(fs
    .collection('profiles')
    .where('role', '==', 'doctor')
    // .where('isActive', '==', true)
    .get());
  useEffect(() => {
    getDoctors().then(([response, error]) => {
      const docs: iProfile[] = [];
      response.docs.forEach((doc: any) => {
        console.log(doc.id);
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDoctors([...docs]);
    }).catch((e) => {
      console.log(e);
    });
  }, []);
  return (
    <>
      <h1>Doctors</h1>
      <Row gutter={16}>
        <DoctorsList doctors={doctors} />
      </Row>
    </>
  );
};

export default PatientHome;
