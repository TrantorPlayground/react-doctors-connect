import React, {ReactNode, useEffect, useState} from "react";
import firebase from "firebase/app";
import {AuthContext} from "../context/AuthContext";
import {auth, fs} from "../firebase/index"
import {notification} from "antd";
import {handleAsyncAwait} from "../helpers/app";
import {useAppDispatch} from "../hooks/app";
import {onProfileGet} from "../store/slice/profileSlice";

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const dispatch = useAppDispatch();
    const getUserProfile = async (user: firebase.User) => {
        const [response, error] = await handleAsyncAwait(fs.doc(`profiles/${user.uid}`).get())
        if (!error)
            dispatch(onProfileGet(response.data()))
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                getUserProfile(firebaseUser)
            } else {
                setUser(null);
            }
            // setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}