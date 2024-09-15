"use client";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Loading from "./components/Home";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
export default function Main() {
  const [showHome, setShowHome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 5000);
    const timer2 = setTimeout(() => {
      setShowHome(false);
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      {showHome ? (
        <div
          className={`transition-opacity duration-2000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Loading />
        </div>
      ) : (
        <>
          <Header />
          <div className="absolute z-0 min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[1] bg-dot-black/[1] flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
            <div className="h-full w-full bg-transparent flex justify-center items-center"></div>
          </div>
          <div className="absolute z-10 h-full w-full flex justify-center items-center">
            <div className="w-11/12 h-5/6 flex justify-between items-start">
              <div className=" h-5/6 w-2/5"></div>
              <div className=" h-5/6 w-2/5">
                <div className="h-full w-full flex justify-around items-center flex-col">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    <Link href={"/vsFriend"}>Vs Friend</Link>
                  </HoverBorderGradient>
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    <Link href={"/vsComputer"}>Vs Computer</Link>
                  </HoverBorderGradient>
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    <Link href={"/vsGlobe"}>Vs Globe</Link>
                  </HoverBorderGradient>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
