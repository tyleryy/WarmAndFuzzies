import firebase_app from "../config";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addData(collection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function updateData(collection, id, mapField, newKey, newValue) {
    const documentRef = doc(db, collection, id);
    let result = null;
    let error = null;

    try {
        result = await updateDoc(documentRef, {
            [`${mapField}.${newKey}`]: newValue
        });
    } catch (e) {
        error = e;
    }

    return {result, error}
}