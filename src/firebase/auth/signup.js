import firebase_app from '../config';
import {getAuth, getUser, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const provider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);

export async function signUp() {
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export const signOutUser = async () => {
    let result = null,
    error = null;

    try {
        result = await signOut(auth);
        console.log(result)
    } catch (e) {
        error = e
        console.log(e)
    }
    return { result, error }
}
