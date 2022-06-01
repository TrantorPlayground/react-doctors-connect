import React from 'react';
import { iAppointment } from '../../interfaces/global';

const AppointmentItem: React.FC<{ appointment: iAppointment }> = ({ appointment }) => {
  console.log(appointment);
  return (
    <div />
  );
};

export default AppointmentItem;
