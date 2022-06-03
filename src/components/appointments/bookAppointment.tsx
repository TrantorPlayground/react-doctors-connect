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

export const BookAppointment: React.FC<{ onFinish:any, loading:boolean }> = ({ loading, onFinish }) => (
  <Spin spinning={loading}>
    <Form
      labelAlign="left"
      labelCol={{ span: 6 }}
      layout="vertical"
      wrapperCol={{ span: 12 }}
      onFinish={onFinish}
    >
      <Form.Item label="Pick time" name="time">
        <DatePicker
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
