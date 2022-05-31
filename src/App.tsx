import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.scss';

const Home = React.lazy(() => import('./components/home/home'));
const Login = React.lazy(() => import('./components/user/login'));
const Register = React.lazy(() => import('./components/user/register'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
