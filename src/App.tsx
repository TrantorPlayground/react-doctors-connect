import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.scss';
import { Layout } from 'antd';
import Appointments from './components/appointments/appointments';
import Header from './layout/header';

const Home = React.lazy(() => import('./components/home/home'));
const Login = React.lazy(() => import('./components/user/login'));
const Register = React.lazy(() => import('./components/user/register'));

const App = () => (
  <Router>
    <Layout>
      <Header />
      <Layout.Content className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Appointments />} path="/appointments" />
          </Routes>
        </Suspense>

      </Layout.Content>

    </Layout>
  </Router>
);

export default App;
