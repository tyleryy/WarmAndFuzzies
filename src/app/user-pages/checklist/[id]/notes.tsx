'use client'
import { useEffect, useState } from "react";
import getDocument, {getAllDocs} from '@/firebase/firestore/getData';
import { useAuthContext } from "@/context/AuthContext";
import { TextField, Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { updateData } from "@/firebase/firestore/addData";


export default function SendNotes() {
    // const [first_col, changeFirstCol] = useState([]);
	// const [second_col, changeSecondCol] = useState([]);
	// const [third_col, changeThirdCol] = useState([]);
    const user : any = useAuthContext();
    const [users, changeUsers] = useState([]);
    const [text, changeText] = useState("");
    const [selectedUser, changeSelectedUser] = useState("");

    const colors = ["yellow", "red", "#03a9f4", "green"]

    // const updateQuotes = (quote_list: any) => {
	// 	changeFirstCol(quote_list.slice(0, quote_list.length/3));
	// 	changeSecondCol(quote_list.slice(quote_list.length/3, 2*(quote_list.length/3)));
	// 	changeThirdCol(quote_list.slice(2*quote_list.length/3));
	// }

    const submitText = async (event: any) => {
       
        if (text === "")
            return alert("Where's your heartfelt message?");
        else if (selectedUser === "")
            return alert("Who are you writing to?");
        let {result, error} = await getDocument("users", selectedUser);
        if (selectedUser === user.uid)
            return alert("Can't send message to yourself, dum dum")

        updateData("users", selectedUser, "received", user.displayName, text);
        updateData("users", user.uid, "sent", result?.name, text);
        changeText("");
        alert("Sent Warm and Fuzzies!")
    }

    interface userRecord {
        id: string;
        name: string;
        email: string;
        received: Array<string>;
        sent: Array<string>;
    }

    const retrieveUsers = async () => {
		let {result, error}: any = await getAllDocs("users");
        if (error) {
            return console.log(error);
        }

        changeUsers(result.map((elem: userRecord) => {return {"name": elem.name, "id":elem.id}}))
	};

    useEffect(() => {
        retrieveUsers();
    }, [])

    return (
        users.length > 0 && (<div className=" bg-gray-800 bg-opacity-50 border-solid 
        border border-gray-500 p-10 space-x-20">
        <div className="flex flex-row space-x-20">
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                value={selectedUser}
                onChange={(event) => changeSelectedUser(event.target.value)}>
                {users.map((elem: string, index: number) => (
                    <FormControlLabel key={index} value={elem.id} control={<Radio sx={{"color": colors[index%colors.length], 
                    '&.Mui-checked': {"color": colors[index%colors.length]}}}/>} label={elem.name} />
                ))
                }
            </RadioGroup>
        </FormControl>
        <div className="flex-grow-0">
            <div className="flex flex-col space-y-2">

                <TextField
                    sx = {{"backgroundColor": "white", "width": "375px"}}
                    placeholder="Write your Warm & Fuzzies here!"
                    multiline
                    minRows={10}
                    maxRows={Infinity}
                    value={text}
                    onChange={(event:any) => changeText(event.target.value)}
                />
                <Button onClick={submitText} variant="contained" sx={{"display": "block"}}>
                    Submit
                </Button>
            </div>
            
        </div>
        </div>
        </div>)
        
    )

}