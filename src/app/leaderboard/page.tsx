'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import Leaderboard from './board';


const leaderboard = () => {
    const router = useRouter();
    return (
        <div>
            <button className="bg-white m-3 block flex-grow-0 text-black 
                px-3.5 p-2.5 rounded-full
                border-solid border-4 border-transparent 
                hover:opacity-80
                active:opacity-50
                flex-shrink-0 
                transition-all duration-75 ease-in-out inline" onClick={() => router.push("/")}>Back</button>
            <span className='block ml-20 mt-5 opacity-60 text-center text-xs'>Complete your Warm & Fuzzies and check off your boxes to appear on the Leaderboard!</span>
            <Leaderboard/>
        </div>
    )
    

};

export default leaderboard;