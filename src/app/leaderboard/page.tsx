'use client'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import Leaderboard from './board';


const leaderboard = () => {
    
    
    return (
        <div>
            <h1>The best around around</h1>
            <Leaderboard/>
        </div>
    )
    

};

export default leaderboard;