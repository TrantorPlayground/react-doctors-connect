import React, { useEffect } from 'react';
import {
  AutoComplete,
  Button, Col, Form, Input, notification, Row, Select, Space, Spin,
} from 'antd';
import { auth, fs } from '../../firebase';

import { sendVerificationEmail, signUp, toast } from '../../helpers/app';
import { useAppDispatch } from '../../hooks/app';
import { closeAll, openModal } from '../../store/slice/modalSlice';
import { doctorFields } from '../../constants';

const Register: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        labelAlign="left"
        labelCol={{ xs: 24, lg: 6 }}
        colon={false}
        initialValues={{
          role: 'patient',
        }}
        onFinish={async (values) => {
          setLoading(true);
          const { response: data, error } = await signUp(values);
          if (!error) {
            const { uid } = data.user;
            if (uid) {
              await fs.doc(`profiles/${uid}`).set({
                role: values.role,
                email: values.email,
                name: values.name,
                bio: values?.bio,
                specialities: values?.specialities,
                consultationCharges: values?.consultationCharges,
              });
              await sendVerificationEmail(auth);
              dispatch(closeAll('*'));
              notification.success({
                message: 'user  has been created successfully!\n Please check your email to verify your account.',
              });
            }
          } else {
            toast(error);
          }
          setLoading(false);
        }}
      >

        <Form.Item
          label="Full name"
          rules={[{
            required: true,
            message: 'Please input your name!',
          }]}
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Register as" name="role">
          <Select onChange={(value) => {
            if (value === 'doctor') {
              setShowAdditionalFields(true);
            } else {
              setShowAdditionalFields(false);
            }
          }}
          >
            <Select.Option value="patient">Patient</Select.Option>
            <Select.Option value="doctor">Doctor</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Email"
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
        {showAdditionalFields && (
          <>
            <Form.Item
              label="Specialities"
              rules={[{
                required: true,
                message: 'Please input your specialities!',
              }]}
              name="specialities"
            >
              <Select mode="tags" options={doctorFields} />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Please input your bio!' },
              ]}
              name="bio"
              label="Bio"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: 'Please input your fee!' },
              ]}
              name="consultationCharges"
              label="Consultation Fee"
            >
              <Input type="number" />
            </Form.Item>
          </>
        )}
        <Row justify="end">
          <Col>
            <Button disabled={loading} htmlType="submit">Register</Button>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Space>
              <Button
                type="link"
                onClick={() => {
                  dispatch(closeAll('*'));
                  dispatch(openModal('login'));
                }}
              >
                Login
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default Register;
