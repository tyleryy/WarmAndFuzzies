import { useAuthContext } from '@/context/AuthContext'
import getData from '@/firebase/firestore/getData';
import { useEffect, useState } from 'react';
import GridLayout from './grid_layout';


const ReceivedList = ({label}: any) => {
    
    const user : any = useAuthContext();
    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);

    const getReceived = async () => {
        let {result, error}: any = await getData("users", user.uid);
        if (error)
            return console.log(error);
        let received_list: any = [];
        let sent_list: any = [];
        Object.entries(result.received).forEach(([key, value]) => {
            received_list.push({"user": key, "message": value});
        })
        Object.entries(result.sent).forEach(([key, value]) => {
            sent_list.push({"user": key, "message": value});
        })
        setReceived(received_list);
        setSent(sent_list);
    }

    useEffect(() => {
        getReceived();
    }, [])
    

    return (
        <div>
        {label === "Received" ?
                received.length > 0 ? 
                <GridLayout item_list={received}/>
                : <span>No Warm and Fuzzies received yet</span>
            :
                sent.length > 0 ? 
                <GridLayout item_list={sent}/>
                : <span>No Warm and Fuzzies sent yet</span> 
        }
        </div>
    )
}


export default ReceivedList