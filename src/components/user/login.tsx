import React from 'react';
import {
  Button, Col, Form, Input, Row, Space, Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { ErrorCodes } from '../../interfaces/global';
import { toast } from '../../helpers/app';
import { closeAll, closeModal, openModal } from '../../store/slice/modalSlice';
import { useAppDispatch } from '../../hooks/app';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  return (
    <Spin spinning={loading}>
      <Form
        labelAlign="left"
        labelCol={{ xs: 24, lg: 6 }}
        colon={false}
        onFinish={(values) => {
          setLoading(true);
          auth.signInWithEmailAndPassword(values.email, values.password).then(() => {
            dispatch(closeModal('login'));
          }).catch((error: ErrorCodes) => {
            toast(error);
          }).finally(() => {
            setLoading(false);
          });
        }}
      >
        <Form.Item
          label="Email/Username"
          rules={[{
            required: true,
            message: 'Please input your email!',
          }, {
            type: 'email',
            message: 'The input is not valid E-mail!',
          }]}
          name="email"
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[{
            required: true,
            message: 'Please input your password!',
          }]}
          name="password"
        >
          <Input.Password />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button disabled={loading} htmlType="submit">Login</Button>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Space>
              <Link
                to="#"
                onClick={() => {
                  dispatch(closeAll('*'));
                  dispatch(openModal('register'));
                }}
              >
                Register
              </Link>
              <Link to="/forgot-password">Forgot Password</Link>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default Login;
