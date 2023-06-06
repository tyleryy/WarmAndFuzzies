'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import Leaderboard from './board';


const leaderboard = () => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.push("/")}>Login Page</button>
            <Leaderboard/>
        </div>
    )
    

};

export default leaderboard;