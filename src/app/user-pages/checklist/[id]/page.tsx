'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { signOutUser} from '@/firebase/auth/signup'
import { useEffect, useState } from 'react';
import CheckList from './checklist';
import {GrMail} from 'react-icons/gr'
import {BsSendPlus, BsListCheck} from 'react-icons/bs'
import Icon_Button from './icon_button';



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

        <div className="flex absolute top-0 right-0 justify-center align-middle
        space-x-10 mb-2 p-3 mr-2 ml-2 mt-2 bg-gray-500 
        bg-opacity-20 w-1/5 border-white border border-opacity-30">
            <div className='flex justify-end flex-row space-x-10'>
                <div className='space-x-5'>
                    <Icon_Button>
                        <GrMail className='h-6 w-6'/>
                    </Icon_Button>
                    <Icon_Button>
                        <BsSendPlus className='h-6 w-6' />
                    </Icon_Button>
                    <Icon_Button>
                        <BsListCheck className='h-6 w-6'/>
                    </Icon_Button>
                </div>
                <div className='space-x-5 right-10'>
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
                    border-solid border-2 border-transparent
                    hover:border-white
                    flex-shrink-0
                    active:opacity-50
                    transition-all duration-300 ease-in-out"
                    onClick={signOutUser}>Sign Out</button>
                </div>
            </div>
        
        </div>
        
        <div id="checkboxes" className='flex min-h-screen flex-col justify-start items-center'>
            <label className="block underline text-6xl font-semi-bold mb-8">Warm and Fuzzies</label>
            <span className="p-0 opacity-70 mt-3">Once you have completed your Warm & Fuzzies for someone, check them off here!</span>
            <CheckList/>
        </div>
        </div>
    )

};

export default Checklist_Page;