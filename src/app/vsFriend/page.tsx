"use client";
import React, { useState, useEffect } from "react";
import LampDemo from "@/components/ui/lamp";
import Header from "@/app/components/Header";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
export default function vsFriend() {
  return (
    <>
      <Header />
      <LampDemo />
      <div className="min-h-screen relative flex justify-center items-center">
        <div className="h-64 w-96  flex justify-between items-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <Link href={"/vsFriend/createRoom"}>Create Room</Link>
          </HoverBorderGradient>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <Link href={"/vsFriend/joinRoom"}>Join Room</Link>
          </HoverBorderGradient>
        </div>
      </div>
    </>
  );
}
