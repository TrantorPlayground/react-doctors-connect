import React, { useEffect } from 'react';
import { Button, List, notification } from 'antd';
import moment from 'moment';
import { iAppointment, iProfile } from '../../interfaces/global';
import { handleAsyncAwait } from '../../helpers/app';
import { fs } from '../../firebase';
import { useAppSelector } from '../../hooks/app';

const AppointmentItem: React.FC<{ appointment: iAppointment }> = ({ appointment }) => {
  const [doctor, setDoctor] = React.useState<iProfile>();
  const [patient, setPatient] = React.useState<iProfile>();
  const { profile } = useAppSelector((state) => state);
  const parseProfiles = async () => {
    const [patientData, error] = await handleAsyncAwait(appointment.patient.get());
    const [doctorData, doctorError] = await handleAsyncAwait(appointment.doctor.get());
    setDoctor(doctorData.data());
    setPatient(patientData.data());
  };
  useEffect(() => {
    //
    parseProfiles().then((e) => {
      //
    }).catch((e) => {
      //
    });
  }, []);
  return (
    <List.Item
      key={appointment.id}
      actions={[
        <Button onClick={async () => {
          await fs.doc(`appointments/${appointment.id}`).delete();
          notification.success({
            message: 'Appointment deleted',
          });
        }}
        >
          Cancel
        </Button>,
      ]}

    >
      You have an appointment with
      {' '}
      <strong>{profile.role === 'doctor' ? patient?.name : doctor?.name}</strong>
      {' '}
      at
      &nbsp;
      {moment(appointment.time).format('MMMM Do YYYY, h:mm a')}

    </List.Item>
  );
};

export default AppointmentItem;
