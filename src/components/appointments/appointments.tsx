import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { handleAsyncAwait, toast } from '../../helpers/app';
import { auth, fs } from '../../firebase';
import { useAppSelector } from '../../hooks/app';
import AppointmentItem from './appointmentItem';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const { profile } = useAppSelector((state) => state);
  const [idType, setIdType] = React.useState<string>('patientId');
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (profile.role === 'doctor') setIdType('doctorId');
    else setIdType('patientId');
  }, [profile.role]);
  const getAppointments = async () => {
    setLoading(true);
    const [response, error] = await handleAsyncAwait(
      fs.collection('appointments').where(idType, '==', auth.currentUser?.uid).get(),
    );
    setLoading(false);
    if (error) return toast(error);
    const temp: any[] = [];
    response.docs.forEach((doc: any) => {
      console.log(doc.data());
      temp.push({
        ...doc.data(),
        id: doc.id,
        doctor: doc.data().doctor.get().then((doc1: any) => doc1.data()).catch((e: any) => console.log(e)),
        patient: doc.data().patient.get(),
      });
    });
    console.log(temp);
    setAppointments([...temp]);
    return false;
  };
  console.log(appointments);
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
    <Spin spinning={loading}>
      {
        appointments.length > 0
        && appointments.map((appointment) => <AppointmentItem appointment={appointment} />)
      }
    </Spin>
  );
};

export default Appointments;
