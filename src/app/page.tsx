"use client";
import { signUp } from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import getData from "@/firebase/firestore/getData";
import Image from "next/image";
// import Cube3D from "./cube"
// import HackLogo from "./hack"
import HackLogoV2 from "./hacklogo2";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  const router = useRouter();

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    let { result, error }: any = await signUp();
    if (error) return console.error(error);
    const displayName = result?.user.displayName;
    const email = result?.user.email;
    const uid = result?.user.uid;
    ({ result, error } = await getData("users", uid));
    if (result === undefined)
      await addData("users", uid, {
        name: displayName,
        email: email,
        received: {},
        sent: {},
      });
    return router.push(`user-pages/checklist/${uid}`);
  };

  return (
    <main className="flex min-h-screen flex-col justify-start items-center">
      <div
        className="navbar
    z-10 min-w-full flex flex-row justify-end mt-3 items-center pt-1"
      >
        {/* <div className="absolute left-20 hover:animate-spin animate-pulse">
        <Image 
          src="/hacklogo.svg"
          width={80}
          height={80}
          alt="Hack at UCI logo"
        />
      </div> */}
        <div
          className="wrapper flex flex-row 
      justify-around space-x-8 m-2 p-3
       min-w-1/10 mr-2 relative z-20"
        >
          <button
            className=" bg-white text-black 
        px-3.5 p-2.5 rounded-full
        border-solid border-4 border-transparent 
        hover:opacity-80
        active:opacity-50
        transition-all duration-75 ease-in-out
        max-w-1/12
        "
            onClick={() => {
              router.push("/leaderboard");
            }}
          >
            Leaderboard
          </button>
          <button
            className="sign-up-button
        bg-gray-600 text-white bg-opacity-50
        px-3.5 py-2.5 inline-block rounded-full
        border-solid border-2 border-transparent
        hover:border-white
        flex-shrink-0
        active:opacity-50
        transition-all duration-300 ease-in-out
        "
            onClick={handleSignIn}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="flex relative flex-shrink-0 flex-col">
        <Image
          className="min-w-1/6 min-h-1/5"
          src="/logo.png"
          height={200}
          width={800}
          alt="logo"
        />
        <div className="flex-shrink inset-0 fixed w-screen h-screen">
          <Canvas
            camera={{
              fov: 75,
              near: 0.1,
              far: 1000,
              zoom: 8,
              position: [0, 0, -10],
            }}
          >
            <HackLogoV2 />
          </Canvas>
        </div>
      </div>
    </main>
  );
}
