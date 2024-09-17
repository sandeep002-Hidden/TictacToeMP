"use client"
import { useState, useEffect } from "react";
import SocketProvider from "../../../../provider/SocketProvider";
import axios from "axios";
import Loading from "@/app/components/Loading";
import Chat from "@/app/components/socketComponents/Chat";
export default function RoomName({ params }) {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [isRoomCreater, setRoomCreater] = useState(false);
  const [loading, setLoading] = useState(true);
  const [player,setPlayer]=useState(null)
  useEffect(() => {
    setRoomName(params.roomName);
  }, [params.roomName]);
  useEffect(() => {
    const getPlayerDetails = async (roomName) => {
      if (!roomName) {
        return;
      }
      try {
        setLoading(true);
        await axios
          .post("/api/users/vsFriend/room", { roomName })
          .then(async (response) => {
            if (!response.data.success) {
              setMessage(response.data.message);
            }
            if (response.data.PlayerNo === 1) {
              setPlayer(1)
              setRoomCreater(true);
            }
            else{
              setPlayer(2)
            }
          });
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPlayerDetails(roomName);
  }, [roomName]);

  const startMatch = () => {
    alert("soon");
  };

  const Ready = () => {
    alert("Ready");
  };

  return (
    <SocketProvider roomName={roomName}>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
        <p>{message}</p>
        <h1>Room {roomName}</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            {isRoomCreater ? (
              <div
                className="border-2 border-white p-2 rounded-lg"
                onClick={startMatch}
              >
                Start Match
              </div>
            ) : (
              <div>
                <button
                  className="border-2 border-white p-2 rounded-lg"
                  onClick={Ready}
                >
                  Ready
                </button>
              </div>
            )}
            <div>
            <Chat roomName={roomName} player={player} />
            </div>
          </>
        )}
      </div>
    </SocketProvider>
  );
}
