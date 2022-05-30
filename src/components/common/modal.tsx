import React from 'react';
import {Modal as AntDModal} from 'antd';
import {useAppDispatch, useAppSelector} from "../../hooks/app";
import {closeModal} from "../../store/slice/modalSlice";

const Modal: React.FC<{ title?:string,children?: React.ReactNode, modalKey: string }> = ({title='',children, modalKey}) => {
    const {modal} = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    return (
        <AntDModal footer={null} onCancel={()=>{
            dispatch(closeModal(modalKey));
        }} destroyOnClose={true} visible={modal[modalKey]??false} title={title}>
            {children}
        </AntDModal>
    );
};

export default Modal;