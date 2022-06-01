import React from 'react';
import {
  Button, Col, DatePicker, Form, notification, Row, Spin,
} from 'antd';
import firebase from 'firebase/app';
import { iProfile } from '../../interfaces/global';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import { checkDoctorAvailability, handleAsyncAwait, toast } from '../../helpers/app';
import { auth, fs } from '../../firebase';
import { closeModal } from '../../store/slice/modalSlice';

export const BookAppointment: React.FC<{ doctor: iProfile }> = ({ doctor }) => {
  const { modal } = useAppSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  return (
    <Spin spinning={loading}>
      <Form
        labelAlign="left"
        labelCol={{ span: 6 }}
        layout="vertical"
        wrapperCol={{ span: 12 }}
        onFinish={async (values) => {
          setLoading(true);
          const [response, error] = await handleAsyncAwait(fs.collection('appointments').add({
            time: values.time.valueOf(),
            doctor: fs.doc(`profiles/${doctor.id}`),
            patient: fs.doc(`profiles/${auth.currentUser?.uid}`),
            doctorId: doctor.id,
            patientId: auth.currentUser?.uid,
          }));
          if (error) return toast(error);
          dispatch((closeModal('bookAnAppointment')));
          notification.success({
            message: 'Appointment booked successfully',
          });
          setLoading(false);
          return false;
        }}
      >
        <Form.Item label="Pick time" name="time">
          <DatePicker
            onChange={async (value) => {
              if (value) {
                await checkDoctorAvailability(
                  doctor.id,
                  value.subtract('15', 'minutes').valueOf(),
                  value.add('15', 'minutes').valueOf(),
                );
              }
            }}
            name="time"
            format="MM/DD/YYYY hh:mmA"
          />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button disabled={loading} type="primary" htmlType="submit">Schedule</Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
