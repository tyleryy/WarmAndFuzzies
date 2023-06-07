'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { signOutUser} from '@/firebase/auth/signup'
import { useEffect, useState } from 'react';
import {User} from "firebase/auth";
import CheckList from './checklist';



const checklist = ({ params }: any) => {
    const user_id = params.id;
    const router = useRouter();
    const user : User | {} = useAuthContext();
    const [username, changeUsername] = useState("");
    
    useEffect(() => {
        if (user==null) {
            // console.log("Sign out redirect triggered");
            router.push("/");
        } else {
            changeUsername(user?.displayName);
        }
    }, [user])

    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    return (
        <div>
            <h1>{username}</h1>
            <div id="checkboxes">
                <label>Warm and Fuzzies</label>
                <CheckList/>
            </div>
            <button onClick={signOutUser}>Sign Out</button>
        </div>
    )

};

export default checklist;