import React, { useContext } from 'react';
import {
  Button, Col, Dropdown, Layout, Menu, Row,
} from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { openModal } from '../store/slice/modalSlice';
import Modal from '../components/common/modal';
import Login from '../components/user/login';
import Register from '../components/user/register';
import Styles from './Layout.module.css';
import { signOut } from '../helpers/app';

const Header = () => {
  const auth = useContext(AuthContext);
  const { profile } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <>
      {auth && !auth?.emailVerified
        && (
          <div className={Styles.unverifiedAccount}>
            Please verify your email address to
            use all services
          </div>
        )}
      <Layout.Header className={Styles.header}>
        <Row justify="center">
          <Col span="22">
            <Row justify="space-between">
              <Col>
                Docon
              </Col>
              <Col>
                {auth?.email && profile.name !== '' && (
                  <Dropdown overlay={(
                    <Menu>
                      <Menu.Item key="appointments">
                        <Link to="/appointments">Appointments</Link>
                      </Menu.Item>
                      <Menu.Item key="logout">
                        <Button
                          type="link"
                          onClick={() => {
                            signOut().then(() => {
                              // nothing to do
                            }).catch(() => {
                              // nothing to do
                            });
                          }}
                        >
                          Logout
                        </Button>
                      </Menu.Item>
                    </Menu>
                  )}
                  >
                    <Button type="link">
                      Welcome
                      {' '}
                      {' '}
                      {profile.name}
                    </Button>
                  </Dropdown>
                )}
                {!auth?.email && (
                  <Button
                    type="link"
                    onClick={() => {
                      dispatch(openModal('login'));
                    }}
                  >
                    Login
                  </Button>
                )}
              </Col>

            </Row>

          </Col>
        </Row>
      </Layout.Header>
      <Modal modalKey="login" title="Login to Docon">
        <Login />
      </Modal>
      <Modal modalKey="register" title="Sign up">
        <Register />
      </Modal>
    </>
  );
};

export default Header;
