import React from 'react';
import { iProfile } from '../../interfaces/global';
import { DoctorItem } from './doctorItem';

const DoctorsList: React.FC<{ doctors: iProfile[] }> = ({ doctors }) => (
  <>
    {doctors.map((doctor) => (
      <DoctorItem key={doctor.id} doctor={doctor} />
    ))}
  </>
);

export default DoctorsList;
