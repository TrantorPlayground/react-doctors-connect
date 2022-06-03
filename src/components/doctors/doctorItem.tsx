import React from 'react';
import {
  Avatar, Button, Card, Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { iProfile } from '../../interfaces/global';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import Modal from '../common/modal';
import { BookAppointment } from '../appointments/bookAppointment';
import { auth, fs } from '../../firebase';
import { closeModal, openModal } from '../../store/slice/modalSlice';
import { handleAsyncAwait, pushChatId, saveAppointment } from '../../helpers/app';
import { setDoctor } from '../../store/slice/appointmentSlice';
import { onChatOpen } from '../../store/slice/messageSlice';

export const DoctorItem: React.FC<{ doctor: iProfile }> = ({ doctor }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Col xs={12} lg={6} md={8}>
      <Card
        title={doctor.name}
        actions={[
          <Button onClick={() => {
            if (auth.currentUser) {
              dispatch(openModal('bookAnAppointment'));
              dispatch(setDoctor(doctor));
            } else {
              dispatch(openModal('login'));
            }
          }}
          >
            Book an appointment
          </Button>,
          <Button onClick={async () => {
            if (auth.currentUser) {
              await pushChatId(doctor, auth?.currentUser?.uid, auth?.currentUser?.uid);
              await pushChatId(doctor, auth?.currentUser?.uid, doctor?.id);
              dispatch(onChatOpen({ uid: auth.currentUser.uid, receiver: doctor.id }));
            } else {
              dispatch(openModal('login'));
            }
          }}
          >
            Start instant chat
          </Button>]}
      >
        <Card.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={doctor.specialities?.join(', ') ?? 'Coming Soon'}
          description={doctor?.bio ?? 'Coming Soon'}
        />
      </Card>
    </Col>
  );
};
