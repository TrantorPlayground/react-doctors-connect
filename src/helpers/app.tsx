import { notification } from 'antd';
import { ErrorCodes, iSignUp } from '../interfaces/global';
import { auth as fbAuth, fs } from '../firebase';

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
export const sendVerificationEmail = async (auth: any) => {
  const [response, error] = await handleAsyncAwait(auth
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
  console.log({ response, error });
  return { response, error };
};
