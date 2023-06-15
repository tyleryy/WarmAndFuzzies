import { useAuthContext } from '@/context/AuthContext'
import getData from '@/firebase/firestore/getData';
import { useEffect, useState } from 'react';
import Message from './message';


const ReceivedList = () => {
    
    const user : any = useAuthContext();
    const [received, setReceived] = useState({});

    const getReceived = async () => {
        let {result, error}: any = await getData("users", user.uid);
        if (error)
            return console.log(error);
        setReceived(result.received);
    }

    useEffect(() => {
        getReceived();
    }, [])
    

    return (
        <div>
            {
                Object.keys(received).length > 0 ? 
                <div className='grid grid-cols-3 space-x-8 space-y-5 m-3'>
                    {Object.entries(received).map(([key, value], index) => {
                        return <Message user={key} message={value} key={index}/>
                    })}
                </div>
                : <span>No Warm and Fuzzies received yet</span>
            }
        </div>
    )
}


export default ReceivedList