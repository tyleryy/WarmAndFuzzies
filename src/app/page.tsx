'use client'
import {useState} from 'react'
import {signUp} from "@/firebase/auth/signup"
import {useRouter} from 'next/navigation'
import addData from '@/firebase/firestore/addData'


export default function Home() {
  const router = useRouter();


  const handleSignIn = async (event: any) => {
    event.preventDefault();
    let {result, error} = await signUp();
    if (error)
      return console.error(error);
    const displayName = result?.user.displayName;
    const email = result?.user.email;
    const uid = result?.user.uid;
    let {result: db_result, error: db_error} = await addData("warm-fuzzies", uid, 
      {"name": displayName, "email": email, "uid": uid}
    )

    if (db_error)
      return console.error(db_error)
      
    return router.push(`user-pages/checklist/${uid}`)
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
