import { notification } from 'antd';
import { ErrorCodes, iProfile, iSignUp } from '../interfaces/global';
import { auth, auth as fbAuth, fs } from '../firebase';
import { closeModal } from '../store/slice/modalSlice';

export const toast = ({ code }: ErrorCodes) => {
  switch (code) {
    case 'auth/user-not-found':
      return notification.error({
        message: 'Invalid username/password',
      });
    case 'auth/email-already-in-use':
      return notification.error({
        message: 'Email already in use',
      });
    default:
      return notification.error({
        message: 'Something went wrong!',
      });
  }
};
export const handleAsyncAwait = async (promise: Promise<any>) => {
  try {
    const response = await promise;
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const signUp = async (values: iSignUp) => {
  const [response, error] = await handleAsyncAwait(fbAuth
    .createUserWithEmailAndPassword(values.email, values.password));
  return { response, error };
};
export const sendVerificationEmail = async (auth1: any) => {
  const [response, error] = await handleAsyncAwait(auth1
    .currentUser.sendEmailVerification());
  return { response, error };
};
export const sendPasswordResetEmail = async (email: string) => {
  const [response, error] = await handleAsyncAwait(fbAuth
    .sendPasswordResetEmail(email));
  return { response, error };
};
export const signIn = async (values: iSignUp) => {
  const [response, error] = await handleAsyncAwait(fbAuth
    .signInWithEmailAndPassword(values.email, values.password));
  return { response, error };
};
export const signOut = async () => {
  await fbAuth.signOut();
};
export const checkDoctorAvailability = async (doctorId: string, dtFrom: number, dtTo: number) => {
  const [response, error] = await handleAsyncAwait(fs.collection('appointments')
    .where('doctorId', '==', doctorId)
    .where('time', '>=', dtFrom)
    .where('time', '<=', dtTo)
    .orderBy('time', 'asc')
    .get());
  return { response, error };
};
export const saveAppointment = async (values:any, doctor:iProfile) => {
  const [response, error] = await handleAsyncAwait(fs.collection('appointments').add({
    time: values.time.valueOf(),
    doctor: fs.doc(`profiles/${doctor.id}`),
    patient: fs.doc(`profiles/${auth.currentUser?.uid}`),
    doctorId: doctor.id,
    patientId: auth.currentUser?.uid,
  }));
  if (error) return toast(error);
  notification.success({
    message: 'Appointment booked successfully',
  });
  return false;
};
export const pushChatId = async (doctor: iProfile, uid:string, docId:string) => {
  const [response, error] = await handleAsyncAwait(fs
    .collection('profiles')
    .doc(`${docId}`)
    .get());
  if (!error) {
    await fs.collection('profiles').doc(docId).update({
      ...response.data(),
      chats: Array.from(new Set([...(response.data().chats ?? []), `chat_${uid}_${doctor.id}`])),
    });
  }
};
