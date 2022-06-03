import React, { useEffect } from 'react';
import { Col, Row, Spin } from 'antd';
import { auth, fs } from '../../firebase';
import { useAppSelector } from '../../hooks/app';
import AppointmentItem from './appointmentItem';

const Appointments: React.FC<{ type: string }> = ({ type = 'patientId' }) => {
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const { profile } = useAppSelector((state) => state);
  const [idType, setIdType] = React.useState<string>(type);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (profile.role === 'doctor') setIdType('doctorId');
    else setIdType('patientId');
  }, [profile.role]);
  const getAppointments = async () => {
    setLoading(true);
    fs.collection('appointments').where(idType, '==', auth.currentUser?.uid).onSnapshot((snapshot) => {
      const temp: any[] = [];
      snapshot.docs.forEach((doc: any) => {
        temp.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setAppointments([...temp]);
      setLoading(false);
      return false;
    });
  };
  useEffect(() => {
    if (auth?.currentUser?.uid) {
      getAppointments().then(() => {
        // console.log(appointments);
      }).catch((e) => {
        console.log(e);
      });
    }
  }, [auth.currentUser?.uid]);
  return (
    <Row justify="center">
      <Col>
        <Spin spinning={loading}>
          {
            appointments.length > 0
            && appointments
              .map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ))
          }
        </Spin>
      </Col>
    </Row>
  );
};

export default Appointments;
