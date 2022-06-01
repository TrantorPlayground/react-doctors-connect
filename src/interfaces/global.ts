export interface ErrorCodes {
  code: string | number;
  message: string;
  errors: [
    { message: string }
  ]
}

export interface iSignUp {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: string;
  address?: string;
}

export interface iProfile {
  email: string;
  id: string,
  name: string;
  phone?: string;
  address?: string;
  role: string;
}

export interface iAppointment {
  id: string;
  time: string;
  doctor: iProfile;
  patient: iProfile;
  doctorId: string;
  patientId: string;
  patientStatus: boolean;
  doctorStatus: boolean;
  updates: [string];
}
