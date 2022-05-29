import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Home = React.lazy(() => import("./components/Home/home"))
const Login = React.lazy(() => import("./components/User/login"))
const Register = React.lazy(() => import("./components/User/register"))

function App() {
    return (
        <>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route element={<Home/>} path={"/"}></Route>
                        <Route element={<Login/>} path={"/login"}></Route>
                        <Route element={<Register/>} path={"/register"}></Route>
                    </Routes>
                </Suspense>
            </Router>
        </>
    );
}

export default App;
