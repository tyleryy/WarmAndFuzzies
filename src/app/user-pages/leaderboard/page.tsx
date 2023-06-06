'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { signOutUser} from '@/firebase/auth/signup'
import { useEffect } from 'react';

const leaderboard = () => {
    const router = useRouter();
    const user : object = useAuthContext();
    

    useEffect(() => {
        if (user==null) {
            console.log("Sign out redirect triggered")
            router.push("/");
        }
         
        
    }, [user])
    
    return (
        <div>
            <h1>The best around around</h1>
            <button onClick={signOutUser}>Sign Out</button>
        </div>
    )
    

};

export default leaderboard;