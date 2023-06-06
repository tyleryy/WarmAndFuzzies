import firebase_app from '../config';
import {getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const provider = new GoogleAuthProvider();
console.log(firebase_app)
const auth = getAuth(firebase_app);

export default async function signUp() {
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider)
    } catch (e) {
        error = e;
    }

    return { result, error };
}
