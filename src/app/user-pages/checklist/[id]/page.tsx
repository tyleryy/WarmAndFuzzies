'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { signOutUser} from '@/firebase/auth/signup'
import { useEffect, useState } from 'react';
import CheckList from './checklist';
import {GrMail} from 'react-icons/gr'
import {BsSendPlus, BsListCheck} from 'react-icons/bs'
import Icon_Button from './icon_button';
import SendNotes from './notes';
import ReceivedList from './received';
import { Switch, FormControlLabel } from '@mui/material';



const Checklist_Page = ({ params }: any) => {
    const user_id = params.id;
    const router = useRouter();
    const user : any = useAuthContext();
    const [username, changeUsername] = useState("");
    const [pageState, changePage] = useState("checklist");
    const [label, setLabel] = useState("Received")

    useEffect(() => {
        if (user===null) {
            // console.log("Sign out redirect triggered");
            router.push("/");
        } else {
            changeUsername(user?.displayName);
        }
    }, [user])

    const handleLabelChange = () => {
        if (label === "Received")
            setLabel("Sent");
        else
            setLabel("Received");
    }

    // const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    
    return (
        <div>

        <div className="flex absolute top-0 right-0 justify-center align-middle
        space-x-10 mb-2 p-3 mr-2 ml-2 mt-2 bg-gray-500 
        bg-opacity-20 min-w-1/5 border-white border border-opacity-30 flex-shrink-0">
            <div className='flex justify-end flex-row space-x-10 flex-shrink-0'>
                <div className='space-x-5'>
                    <Icon_Button click_func={() => changePage("received")}>
                        <GrMail className='h-6 w-6'/>
                    </Icon_Button>
                    <Icon_Button click_func={() => changePage("send")}>
                        <BsSendPlus className='h-6 w-6' />
                    </Icon_Button>
                    <Icon_Button click_func={() => changePage("checklist")}>
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
        {pageState === "received" &&
            <div className="m-3 bg-gray-500 w-40 bg-opacity-30 border border-gray-600 p-2">
                <FormControlLabel control={<Switch defaultChecked onChange={handleLabelChange}/>} label={label} />
            </div>
        }

        <div id="checkboxes" className='flex min-h-screen flex-col justify-middle items-center mt-40'>
            <label className="block underline text-6xl font-semi-bold mb-8">Warm and Fuzzies</label>
        {pageState === "checklist" && <CheckList/>}
        {pageState === "send" && <SendNotes/>}
        {pageState === "received" && <ReceivedList label={label}/>}
        </div>
        </div>
    )

};

export default Checklist_Page;