'use client'
import {useState} from 'react'
import signUp from "@/firebase/auth/signup"
import {useRouter} from 'next/navigation'


export default function Home() {
  const router = useRouter();


  const handleSignIn = async (event: any) => {
    event.preventDefault();
    const {result, error} = await signUp();
    if (error)
      return console.log(error);
    console.log(result)
    return router.push("user-pages/leaderboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="wrapper">
        <div className="form-wrapper">
            <button onClick={handleSignIn}>Sign up</button>
        </div>
      </div>
    </main>
  )
}
