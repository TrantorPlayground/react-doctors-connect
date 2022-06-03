import React, { useContext, useEffect } from 'react';
import {
  Button, Col, Dropdown, Layout, Menu, Row,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../hooks/app';
import { openModal } from '../store/slice/modalSlice';
import Modal from '../components/common/modal';
import Login from '../components/user/login';
import Register from '../components/user/register';
import Styles from './Layout.module.css';
import { signOut } from '../helpers/app';
import { onLogout } from '../store/slice/profileSlice';
import Chat from '../components/chat/chat';

const Header = () => {
  const auth = useContext(AuthContext);
  const { profile } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const { messages: { chatWindow = null } } = useAppSelector((state) => state);
  const [showChatUI, setShowChatUI] = React.useState(false);
  useEffect(() => {
    if (chatWindow?.uid && chatWindow.receiver) {
      setShowChatUI(true);
    }
  }, [chatWindow]);
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
                              history('/', { replace: true });
                              dispatch(onLogout({}));
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
      {showChatUI && chatWindow?.receiver && <Chat receiver={chatWindow.receiver} />}
    </>
  );
};

export default Header;
