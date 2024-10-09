"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import Loading from "@/app/components/Loading";
import RoomName from "../vsFriend/room/[roomName]/page";
import { useRouter } from 'next/navigation'

interface RoomProps {
  _id: string;
  RoomName: string;
  player1: string;
  player2: string;
}

export default function vsGlobe() {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<RoomProps[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter()

  useEffect(() => {
    const getAllRooms = async () => {
      setLoading(true);
      try {
        await axios.get("/api/users/vsGlobe").then((rooms: any) => {
          setRooms(rooms.data.rooms);
        });
      } catch (error: any) {
        setErrMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    const isLoggedInUser = async () => {
      setLoading(true);
      try {
        await axios.get("/api/users/me").then((res: any) => {
          if (res.data.success) {
            setIsLoggedIn(true);
            getAllRooms();
          }
        });
      } catch (error: any) {
        setErrMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    isLoggedInUser();
  }, []);
  const leaveGame = async (roomId: string) => {
    try {
      await axios
        .post("/api/users/vsGlobe/leaveGame", { roomId })
        .then((res: any) => {
          console.log(res.data);
          if (res.data.success) {
            setMessage(res.data.message);
            
          } else {
            setErrMessage(res.data.message);
          }
        });
    } catch (error: any) {
      setErrMessage(error.message);
    }
  };
  const joinGame = async (roomId: string) => {
    try {
      await axios
        .post("/api/users/vsGlobe/waittingRoom", { roomId })
        .then((res: any) => {
          console.log(res.data);
          if (res.data.success) {
            setMessage(res.data.message);
            router.push(`/vsGlobe/${roomId}`)
          } else {
            setErrMessage(res.data.message);
          }
        });
    } catch (error: any) {
      setErrMessage(error.message);
    }
  };
  return (
    <>
      <Header />
      {/* <LampDemo/> */}
      <div className="absolute z-0 min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[1] bg-dot-black/[1] flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        <div className="h-full w-full bg-transparent flex justify-center items-center"></div>
      </div>

      <div className="absolute z-10 h-full w-full flex justify-center items-center flex-col">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="h-full w-1/2  flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Available Rooms
            </h1>
            <p>{message}</p>
            <p>{errMessage}</p>
            <div className="h-full w-full ">
              {rooms.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black p-6 my-4 rounded-lg shadow-md border hover:shadow-xl transition-shadow duration-300 ease-in-out flex justify-around items-center"
                >
                  <div>
                    <p className="text-xl font-semibold text-slate-600 dark:text-gray-300">
                      {item.RoomName}
                    </p>
                    {item.player1 !== "" && item.player2 !== "" ? (
                      <p className="text-green-600 font-bold dark:text-green-400">
                        2 players
                      </p>
                    ) : item.player1 !== "" || item.player2 !== "" ? (
                      <p className="text-yellow-500 font-bold dark:text-yellow-400">
                        1 player
                      </p>
                    ) : (
                      <p className="text-red-500 font-bold dark:text-red-400">
                        0 players
                      </p>
                    )}
                  </div>
                  <div className="flex justify-around items-center flex-col h-full">
                    <button
                      className="border-2 w-full border-highlight rounded-xl px-3 py-2"
                      onClick={() => {
                        joinGame(item._id);
                      }}
                    >
                      Join Now
                    </button>
                    <button
                      className="border-2 w-full border-highlight rounded-xl px-3 py-2"
                      onClick={() => {
                        leaveGame(item._id);
                      }}
                    >
                      Leave Now{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
