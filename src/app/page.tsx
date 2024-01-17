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
import LandscapeIcon from "@mui/icons-material/Landscape";

function SparklesPreview() {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
        <LandscapeIcon className="text-white md:text-9xl lg:text-9xl text-4xl inline" />
        Warm and Fuzzies
      </h1>
      <div className="w-full h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px]  blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="w-auto h-auto"
          particleColor="#FFFFFF"
        />

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
    <main className="flex min-h-screen flex-col justify-start items-center">
      <div
        className="navbar
    z-10 min-w-full flex flex-row justify-end mt-3 items-center pt-1"
      >
        <div className="absolute left-20">
          <a href="https://hack.ics.uci.edu/">
            <Image
              src="/hacklogo.svg"
              width={80}
              height={80}
              alt="Hack at UCI logo"
            />
          </a>
        </div>

        <div
          className="wrapper flex flex-row 
      justify-around space-x-8 m-2 p-3
       min-w-1/10 mr-2 relative z-20"
        >
          <Button
            onClick={() => {
              router.push("/leaderboard");
            }}
          >
            LeaderBoard
          </Button>

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
      <SparklesPreview></SparklesPreview>

      {/* <div className="inset-0 fixed w-screen h-screen"> */}
      {/* <Canvas
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
      </Canvas> */}
      {/* </div> */}
      <BackgroundBeams></BackgroundBeams>
    </main>
  );
}
