import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
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
      {!auth?.emailVerified
        && (
        <div className={Styles.unverifiedAccount}>
          Please verify your email address to
          use all services
        </div>
        )}
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item disabled>Docon</Menu.Item>
          {auth?.email && profile.name !== '' && (
          <>
            <Menu.Item className={Styles.alignMenuItems}>
              <span>Welcome </span>
              <span>{ profile?.name }</span>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                signOut().then(() => {
                  // nothing to do
                }).catch(() => {
                  // nothing to do
                });
              }}
            >
              Logout
            </Menu.Item>
          </>
          )}
          {!auth?.email && (
          <Menu.Item
            className={Styles.alignMenuItems}
            onClick={() => {
              dispatch(openModal('login'));
            }}
          >
            Login
          </Menu.Item>
          )}
        </Menu>
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
