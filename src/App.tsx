import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.scss';
import { Col, Layout, Row } from 'antd';
import Appointments from './components/appointments/appointments';
import Header from './layout/header';
import { ProtectedRoute } from './components/protectedRoute';
import Chat from './components/chat/chat';
import { useAppSelector } from './hooks/app';

const Home = React.lazy(() => import('./components/home/home'));
const Login = React.lazy(() => import('./components/user/login'));
const Register = React.lazy(() => import('./components/user/register'));

const App = () => {
  const { profile } = useAppSelector((state) => state);

  return (
    <Router>
      <Layout>
        <Header />
        <Layout.Content className="content">
          <Row justify="center">
            <Col span={22}>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route element={profile?.role === 'doctor' ? <Appointments type="doctorId" /> : <Home />} path="/" />
                  <Route element={<Login />} path="/login" />
                  <Route element={<Register />} path="/register" />
                  <Route
                    element={(
                      <ProtectedRoute>
                        <Appointments
                          type={profile.role !== 'doctor' ? 'patientId' : 'doctorId'}
                        />
                      </ProtectedRoute>
                    )}
                    path="/appointments"
                  />
                </Routes>
              </Suspense>
            </Col>
          </Row>

        </Layout.Content>

      </Layout>
    </Router>
  );
};

export default App;
