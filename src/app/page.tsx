'use client'
import {signUp} from "@/firebase/auth/signup"
import {useRouter} from 'next/navigation'
import addData from '@/firebase/firestore/addData'
import getData from '@/firebase/firestore/getData'
import Image from 'next/image'
import Cube3D from "./cube"
import { Canvas } from '@react-three/fiber'


export default function Home() {
  const router = useRouter();


  const handleSignIn = async (event: any) => {
    event.preventDefault();
    let {result, error}: any = await signUp();
    if (error)
      return console.error(error);
    const displayName = result?.user.displayName;
    const email = result?.user.email;
    const uid = result?.user.uid;
    ({result, error} = await getData("users", uid));
    if (result === undefined)
      await addData("users", uid, {"name":displayName, "email":email, "received": {}, "sent": {}});
    return router.push(`user-pages/checklist/${uid}`);
  }

  return (
    <main className="flex min-h-screen flex-col justify-start items-center">
    <div className="navbar
    z-10 min-w-full flex flex-row justify-end mt-3 items-center pt-1">
      <div className="absolute left-20 hover:animate-spin animate-pulse">
        <Image 
          src="/hacklogo.svg"
          width={80}
          height={80}
          alt="Hack at UCI logo"
        />
      </div>
      <div className="wrapper flex flex-row 
      justify-around space-x-8 m-2 p-3
      w-1/6 mr-2 relative right-10">
        <button className=" bg-white text-black 
        px-3.5 p-2.5 rounded-full
        border-solid border-4 border-transparent 
        hover:opacity-80
        active:opacity-50
        flex-shrink-0
        transition-all duration-75 ease-in-out
        "
        onClick={()=> {router.push("/leaderboard")}}>
          Leaderboard
        </button>
        <button className="sign-up-button
        bg-gray-600 text-white bg-opacity-50
        px-3.5 py-2.5 inline-block rounded-full
        border-solid border-2 border-transparent z-50
        hover:border-white
        flex-shrink-0
        active:opacity-50
        transition-all duration-300 ease-in-out
        " onClick={handleSignIn}>Sign up</button>
      </div>
    </div>
    <div className="flex relative flex-shrink flex-col bottom-60 z-0 items-center">
      <Image
        src="/logo.png"
        height={400}
        width={800}
        alt="logo"
      />
      <div className="relative flex-shrink left-16 block z-10 bottom-56 h-screen w-screen min-w-96 max-h-96">
        <Canvas 
              camera={{
              fov: 75,
              near: 0.1,
              far: 1000,
              zoom: 8,
              position: [0, 0, -10]
            }}
          >
          <Cube3D/>
        </Canvas>
        <span className="flex justify-center text-gray-50 
          opacity-30 text-sm relative"
          >Click and Drag the Cube!
        </span>
      </div>
    </div>
    
   </main>
  )
}
