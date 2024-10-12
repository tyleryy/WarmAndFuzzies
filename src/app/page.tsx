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
import SparklesCore from "./components/sparkles";
import { BackgroundBeams } from "@/app/components/background-beams";
import { Button } from "./components/moving-border";
import { motion } from "framer-motion";

function SparklesPreview({ on }: { on: boolean }) {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-start overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
        Warm and Fuzzies
      </h1>
      <div className="w-full h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px]  blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />

        {/* Core component */}
        {on && (
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={100}
            className="w-auto h-auto"
            particleColor="#FFFFFF"
          />
        )}

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

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
    <main className=" min-h-screen justify-start items-center overflow-hidden">
      <div
        className="navbar
    z-10 min-w-full flex flex-row justify-end mt-3 items-center pt-1 mr-10"
      >
        <div
          className="wrapper flex flex-row 
      justify-around space-x-8 m-2 p-3
       min-w-1/10 mr-2 relative z-20"
        >
          <div className="">
            Look at this cool 3D logo tho! <br/>
            Use your mouse to move it around!
          </div>
          {/* <button
            onClick={() => {
              router.push("/leaderboard");
            }}
            className=" max-h-14 px-4 mt-[6px] rounded-md bg-sky-600 bg-opacity-30 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
          >
            LeaderBoard
          </button> */}

          {/* <Button onClick={handleSignIn}>
           */}
           <Button>
            <strong>Site is now archived</strong>
          </Button>
          {/* <div className="ml-10 mr-5">
            <a href="https://hack.ics.uci.edu/">
              <Image
                src="/hacklogo.svg"
                width={80}
                height={80}
                alt="Hack at UCI logo"
              />
            </a>
          </div> */}
        </div>
      </div>
      <SparklesPreview on={false}></SparklesPreview>

      <div className="inset-0 fixed w-screen h-screen">
        <Canvas
          className=""
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
      {/* <BackgroundBeams></BackgroundBeams> */}
    </main>
  );
}
