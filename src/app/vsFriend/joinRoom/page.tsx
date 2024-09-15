"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function JoinRoom() {
  const router = useRouter();
  const [room, setRoom] = useState({
    RoomName: "",
    roomPassword: "",
  });
  const [message, setMessage] = useState(
    "Enter room name and password to play with Your Friend"
  );
  const JoinRoom = async () => {
    await axios
      .post("/api/users/vsFriend/joinRoom", room)
      .then((res: any) => {
        if (res.data.success) {
          router.push(`/vsFriend/room/${room.RoomName}`);
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err: any) => {
        console.log(err.message);
        setMessage("Error occur while joining , Try again after some Time");
      });
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
            {message}
          </h2>
          <div className="my-8">
            <LabelInputContainer>
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                placeholder="aCrHOns"
                type="text"
                required
                onChange={(e) => {
                  setRoom({ ...room, RoomName: e.target.value });
                }}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="roomPassword">Room Password</Label>
              <Input
                id="roomPassword"
                placeholder="••••••••"
                type="password"
                required
                onChange={(e) => {
                  setRoom({ ...room, roomPassword: e.target.value });
                }}
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={JoinRoom}
            >
              Join
              <BottomGradient />
            </button>
          </div>
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
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
