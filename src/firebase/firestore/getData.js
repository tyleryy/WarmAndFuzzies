import { getAuth } from "firebase/auth";
import firebase_app from "../config";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = (await getDoc(docRef)).data();
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getAllDocs(collection_name) {
    let result = [];
    let error = null;
    try {
        result = await getDocs(collection(db, collection_name));
    } catch (e) {
        error = e;
    }
    result = result.docs.map((elem) => {return {id: elem.id, ...elem.data()} })
    return {result, error};
}

// ! very terrible, not efficient needs rework
export async function getAllMembers(collect) {
    let result = null;
    let error = null;
    let output = [];
    
    try {
        result = await getDocs(collection(db, collect));
        // user has doc_id first
        // checklist = each pure warm and fuzzies doc (each checkmark)
        result = result.docs.map((doc) => {return {"checklist": doc.data(), "user": doc.id}}) 
        // console.log(result) 

        for (let doc of result) { // ! async calls don't work in a forEach loop, so opted for traditional
            // console.log(doc)
            let user_data = (await getDocument("users",doc.user)).result;
            user_data["uid"] = doc.id;
            // user data = Google auth creds
            // checklist = only checked marked boxes
            let payload = {"data": doc.checklist.data.filter((elem) => {
                return elem.checked;
            }),
            "user_data": user_data}

            output.push(
                payload
            )
            // console.log(output)   
        }

    } catch (e) {
        error = e;
        return console.log(error)
        
    }

    output?.sort((elem, elem2) => { return elem2.data.length - elem.data.length})
    if (output.length >= 2)
        [output[0], output[1]] = [output[1], output[0]]
    // console.log(output)
    return {output, error};
}