import React from 'react';
import { useNavigate } from 'react-router-dom';
import { iProfile } from '../../interfaces/global';
import { DoctorItem } from './doctorItem';
import { BookAppointment } from '../appointments/bookAppointment';
import { saveAppointment } from '../../helpers/app';
import { closeModal } from '../../store/slice/modalSlice';
import Modal from '../common/modal';
import { useAppDispatch, useAppSelector } from '../../hooks/app';

const DoctorsList: React.FC<{ doctors: iProfile[] }> = ({ doctors }) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const { doctor } = useAppSelector((state) => state.appointment);
  return (
    <>
      <Modal title="Schedule an appointment" modalKey="bookAnAppointment">
        <BookAppointment
          loading={loading}
          onFinish={async (values: any) => {
            setLoading(true);
            await saveAppointment(values, doctor);
            dispatch(closeModal('bookAnAppointment'));
            setLoading(false);
          }}
        />
      </Modal>
      {doctors.map((doc) => (
        <DoctorItem key={doc.id} doctor={doc} />
      ))}
    </>
  );
};

export default DoctorsList;
