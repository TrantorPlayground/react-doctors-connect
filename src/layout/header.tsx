import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Col, Layout, Row} from "antd";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/app";
import {openModal} from "../store/slice/modalSlice";
import Modal from "../components/common/modal";
import Login from "../components/user/login";
import Register from "../components/user/register";
import Styles from "./Layout.module.css"
import {auth as fbAuth} from "../firebase/index";

const Header = () => {
    const auth = useContext(AuthContext);
    const {profile} = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    return (
        <>
            {!auth?.emailVerified && <div className={Styles.unverifiedAccount}>Please verify your email address to use all services</div>}
            <Layout.Header className={Styles.header}>
                <Row justify={'space-between'}>
                    <Row>
                        <Col>
                            Docon
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {auth?.email && profile.name!=='' && <>
                            <ul>
                                <li>Welcome {profile?.name}</li>
                                <li><Link to={"#"} onClick={()=>{
                                    fbAuth.signOut();
                                }}>Logout</Link></li>
                            </ul>
                            </>}
                            {!auth?.email && <Link to={"#"} onClick={() => {
                                dispatch(openModal('login'))
                            }}>Login</Link>}
                        </Col>
                    </Row>
                </Row>
            </Layout.Header>
            <Modal modalKey={'login'} title={'Login to Docon'}>
                <Login/>
            </Modal>
            <Modal modalKey={'register'} title={'Sign up'}>
                <Register/>
            </Modal>
        </>
    );
};

export default Header;