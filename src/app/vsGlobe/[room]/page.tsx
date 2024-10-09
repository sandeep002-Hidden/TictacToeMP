"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SocketProvider from "@/provider/SocketProvider";
import VSGlobeProvider from "@/provider/VsGlobeSocketprovider";
import axios from "axios";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";
import Chat from "@/app/components/socketComponents/Chat";
import Waitting from "@/app/components/socketComponents/watting";
export default function WaittingPage({ params }: any) {
  const [room, setRoom] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRoomVerified, setRoomVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const [playerNo, setPlayerNo] = useState(0);
  useEffect(() => {
    if (!params.room) {
      return;
    }
    setRoom(params.room);
  }, []);
  //verifying room
  useEffect(() => {
    const verifyRoom = async (roomName: string) => {
      if (!roomName) {
        return;
      }
      setLoading(true);
      try {
        await axios
          .post("/api/users/vsGlobe/verifyRoom", { roomName })
          .then((res) => {
            if (!res.data.success) {
              setErrorMessage(res.data.message);
            } else {
              setRoomVerified(true);
              setPlayerNo(res.data.playerNo);
              setRoomName(res.data.roomName);
              localStorage.removeItem(res.data.roomName)
              localStorage.removeItem(`${res.data.roomName}as`)
              localStorage.setItem(res.data.roomName,res.data.playerNo.toString())
              if(res.data.playerNo==1){
                localStorage.setItem(`${res.data.roomName}as`,"X")
              }
            }
          });
      } catch (error: any) {
        console.log(error.message);
        console.log("Error in verifying room");
      } finally {
        setLoading(false);
      }
    };
    verifyRoom(room);
  }, [room]);
  return (
    <>
      <Header />
      {loading && (
        <div className="h-full w-full  flex justify-center items-center">
          <Loading />
        </div>
      )}
      {isRoomVerified ? (
        <>
          <SocketProvider roomName={roomName}>
            <Chat roomName={roomName} player={playerNo} />
          </SocketProvider>
          <VSGlobeProvider roomName={roomName}>
            <Waitting roomName={roomName} />
          </VSGlobeProvider>
        </>
      ) : (
        <div>
          <h1 className="text-center">{errorMessage}</h1>
        </div>
      )}
    </>
  );
}
