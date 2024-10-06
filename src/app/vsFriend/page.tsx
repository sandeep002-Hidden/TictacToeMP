"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import axios from "axios";
import RoomName from "./room/[roomName]/page";
interface Room {
  RoomName: string;
  roomPassword: string;
}
export default function vsFriend() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const getAllRooms = async () => {
      try {
        await axios.get("/api/users/vsFriend/").then((results) => {
          if (!results.data.success) {
            setMessage(results.data.message);
          } else {
            console.log(results.data.rooms);
            setRooms(results.data.rooms);
          }
        });
      } catch (error: any) {
        console.log(error.message);
      }
    };
    const isLoggedInUser = async () => {
      await axios.get("/api/users/me").then((res: any) => {
        if (res.data.success) {
          setIsLoggedIn(true);
          getAllRooms();
        }
      });
    };
    isLoggedInUser();
  }, []);
  return (
    <>
      <Header />
      {isLoggedIn ? (
        <div>
          <div className="absolute z-0 min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[1] bg-dot-black/[1] flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
            <div className="h-full w-full bg-transparent flex justify-center items-center"></div>
          </div>
          <div className=" min-h-screen relative flex justify-center items-center flex-col">
            <div className="h-fit w-1/2 flex justify-between items-center ">
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
            <div className="w-full flex justify-center items-center">
              {rooms.map((item, index) => (
                <div
                  key={index}
                  className="h-24 w-1/2 px-8 border-2 rounded-xl border-white flex justify-around items-center"
                >
                  <div>
                    <h1>RoomName -:{item.RoomName}</h1>
                    <h1>Room Password -:{item.roomPassword}</h1>
                  </div>
                  <Link href={`/vsFriend/room/${item.RoomName}`}>
                    Go to room
                  </Link>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
          <p> to play with friends</p>
        </div>
      )}
    </>
  );
}
