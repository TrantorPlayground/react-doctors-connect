import {ErrorCodes, iSignUp} from "../interfaces/global";
import {notification} from "antd";
import {auth} from "../firebase";

export const toast = ({code, errors}: ErrorCodes) => {
    switch (code) {
        case "auth/user-not-found":
            return notification.error({
                message: "Invalid username/password",
            });
        case 'auth/email-already-in-use':
            return notification.error({
                message: "Email already in use",
            })
    }
}
export const signUp = async (values: iSignUp) => {
    const [response,error] = await handleAsyncAwait(auth.createUserWithEmailAndPassword(values.email, values.password));
    return {response,error};
}
export const sendVerificationEmail = async (auth:any) => {
    const [response,error] = await handleAsyncAwait(auth.currentUser.sendEmailVerification());
    return {response,error};
}
export const sendPasswordResetEmail = async (email: string) => {
    const [response,error] = await handleAsyncAwait(auth.sendPasswordResetEmail(email));
    return {response,error};
}
export const signIn = async (values: iSignUp) => {
    const [response,error] = await handleAsyncAwait(auth.signInWithEmailAndPassword(values.email, values.password));
    return {response,error};
}
export const signOut = async () => {
    await auth.signOut();
}
export const handleAsyncAwait = async (promise: Promise<any>) => {
    try {
        const response = await promise;
        return [response,null];
    } catch (error) {
        return [null,error];
    }
}