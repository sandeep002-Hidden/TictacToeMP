"use client";
import React, { useEffect, useState } from "react";
import LampDemo from "@/components/ui/lamp";
import Header from "@/app/components/Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function CreateRoom() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [room, setRoom] = useState({
    RoomName: "",
    roomPassword: "",
  });

  // Generates a random string 
  function generateRandomString(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  // Generates a random password 
  function generateRandomPassword(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }

  useEffect(() => {
    setRoom({
      RoomName: generateRandomString(10),
      roomPassword: generateRandomPassword(6),
    });
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const createRoom=async()=>{
    try {
        await axios.post("/api/users/vsFriend/createRoom",room).then((result)=>{
            console.log(result)
        })
    } catch (error) {
        
    }
  }
  return (
    <>
      <Header />
      <LampDemo />
      <div className="relative flex justify-center items-center">
        <div className="my-8 flex justify-center items-end flex-col h-fit w-1/2">
          <LabelInputContainer>
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              value={room.RoomName}
              type="text"
              required
              onChange={(e) => setRoom({ ...room, RoomName: e.target.value })}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={room.roomPassword}
              type={passwordVisible ? "text" : "password"}
              required
              onChange={(e) => setRoom({ ...room, roomPassword: e.target.value })}
            />
          </LabelInputContainer>

          <button
            onClick={togglePasswordVisibility}
            className="bg-gradient-to-br relative group/btn p-2 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 w-fit font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={createRoom}
          >
            Create Room
            <BottomGradient />
          </button>
        </div>
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
