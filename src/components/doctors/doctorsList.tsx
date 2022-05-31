import React from 'react';
import {
  Avatar, Button, Card, Col, DatePicker, Form, notification, Row, Spin,
} from 'antd';
import { iProfile } from '../../interfaces/global';
import { useAppDispatch, useAppSelector } from '../../hooks/app';
import Modal from '../common/modal';
import { closeModal, openModal } from '../../store/slice/modalSlice';
import { auth, fs } from '../../firebase';
import { checkDoctorAvailability, handleAsyncAwait, toast } from '../../helpers/app';

const DoctorItem: React.FC<{ doctor: iProfile }> = ({ doctor }) => {
  const { modal } = useAppSelector((state) => state);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal title="Schedule an appointment" modalKey="bookAnAppointment">
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

const DoctorsList: React.FC<{ doctors: iProfile[] }> = ({ doctors }) => (
  <>
    {doctors.map((doctor) => (
      <DoctorItem doctor={doctor} />
    ))}
  </>
);

export default DoctorsList;
