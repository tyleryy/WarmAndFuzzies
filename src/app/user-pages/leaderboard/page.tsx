'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { User} from 'firebase/auth'
import { useEffect } from 'react';

const first_component = () => {
    const router = useRouter();
    const user : object = useAuthContext();
    

    useEffect(() => {
        if (user==null)
            router.push("/");
        console.log(user)    
        
    }, [user])
    
    return (
        <div>
            <h1>The best around around</h1>
        </div>
    )
    

};

export default first_component;