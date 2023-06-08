'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import Leaderboard from './board';


const leaderboard = () => {
    const router = useRouter();
    return (
        <div>
            <button className="bg-white m-3 inline text-black 
                px-3.5 p-2.5 rounded-full
                border-solid border-4 border-transparent 
                hover:opacity-80
                active:opacity-50
                flex-shrink-0 
                transition-all duration-75 ease-in-out" onClick={() => router.push("/")}>Back</button>
            <Leaderboard/>
        </div>
    )
    

};

export default leaderboard;