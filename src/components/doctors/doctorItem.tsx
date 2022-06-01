import React from 'react';
import {
  Avatar, Button, Card, Col,
} from 'antd';
import { iProfile } from '../../interfaces/global';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import Modal from '../common/modal';
import { BookAppointment } from '../appointments/bookAppointment';
import { auth } from '../../firebase';
import { openModal } from '../../store/slice/modalSlice';

export const DoctorItem: React.FC<{ doctor: iProfile }> = ({ doctor }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal title="Schedule an appointment" modalKey="bookAnAppointment">
        <BookAppointment doctor={doctor} />
      </Modal>
      <Col xs={12} lg={6} md={8}>
        <Card
          title={doctor.name}
          actions={[
            <Button onClick={() => {
              if (auth.currentUser) {
                dispatch(openModal('bookAnAppointment'));
              } else {
                dispatch(openModal('login'));
              }
            }}
            >
              Book an appointment
            </Button>,
            <Button>Start instant chat</Button>]}
        >
          <Card.Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Dentist"
            description="Here goes more info"
          />
        </Card>
      </Col>
    </>
  );
};
