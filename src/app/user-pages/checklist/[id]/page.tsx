'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { signOutUser} from '@/firebase/auth/signup'
import { useEffect, useState } from 'react';
import {getAuth, User} from "firebase/auth"
import Checkbox from '@mui/material/Checkbox';
import { hexToRgb } from '@mui/material';



const checklist = ({ params }: any) => {
    const user_id = params.id;
    const router = useRouter();
    const user : User | {} = useAuthContext();
    const [username, changeUsername] = useState("")
    

    useEffect(() => {
        if (user==null) {
            console.log("Sign out redirect triggered")
            router.push("/");
        } else {
            console.log(user)
            changeUsername(user?.displayName)
            
        }
    }, [user])

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    return (
        <div>
            <h1>{username}</h1>
            <div id="checkboxes">
                <label>Warm and Fuzzies</label>
                <Checkbox {...label} defaultChecked color="info" 
                    sx={{
                        border: "white",
                        color :"white",
                        '&:hover': { bgcolor: "white", opacity: .2 },
                      }}
                />
                <Checkbox {...label} defaultChecked color="secondary" 
                sx={{
                        '& .MuiIconButton-root': {
                          border: '2px solid white', // Custom border style
                        },
                      }} />
                <Checkbox {...label} defaultChecked color="success" />
                <Checkbox {...label} defaultChecked color="info" />
            </div>

            <button onClick={signOutUser}>Sign Out</button>
        </div>
    )
    

};

export default checklist;