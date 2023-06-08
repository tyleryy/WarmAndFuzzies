'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { signOutUser} from '@/firebase/auth/signup'
import { useEffect, useState } from 'react';
import CheckList from './checklist';



const Checklist_Page = ({ params }: any) => {
    const user_id = params.id;
    const router = useRouter();
    const user : any = useAuthContext();
    const [username, changeUsername] = useState("");
    
    useEffect(() => {
        if (user===null) {
            // console.log("Sign out redirect triggered");
            router.push("/");
        } else {
            changeUsername(user?.displayName);
        }
    }, [user])

    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    return (
        <div className='mb-1'>
        <div className="flex justify-end flex-row mt-3 relative right-3 space-x-5">
            <h1 className="bg-white inline text-black 
                px-3.5 p-2.5 rounded-full
                border-solid border-4 border-transparent 
                hover:opacity-80
                active:opacity-50
                flex-shrink-0 
                transition-all duration-75 ease-in-out">{username}
            </h1>
            <button className="
            bg-gray-600 text-white bg-opacity-50
            px-3.5 py-2.5 inline-block rounded-full
            border-solid border-2 border-transparent z-50
            hover:border-white
            flex-shrink-0
            active:opacity-50
            transition-all duration-300 ease-in-out"
            onClick={signOutUser}>Sign Out</button>
        </div>
        <div id="checkboxes" className='flex min-h-screen flex-col justify-start items-center'>
            <label className="block underline text-6xl font-semi-bold mb-8">Warm and Fuzzies</label>
            <CheckList/>
        </div>
        </div>
    )

};

export default Checklist_Page;