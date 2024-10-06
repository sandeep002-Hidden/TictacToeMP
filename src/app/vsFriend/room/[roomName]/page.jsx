"use client";
import { useState, useEffect } from "react";
import SocketProvider from "../../../../provider/SocketProvider";
import axios from "axios";
import Loading from "@/app/components/Loading";
import Chat from "@/app/components/socketComponents/Chat";
import Ready from "@/app/components/socketComponents/Ready";
import StartMatch from "@/app/components/socketComponents/StartMatch";
export default function RoomName({ params }) {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [isRoomCreater, setRoomCreater] = useState(false);
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);
  const [selectedOption, setSelectedOption] = useState("X");
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
            if (response.data.playerNo === 1) {
              setPlayer(1);
              setRoomCreater(true);
            } else {
              setPlayer(2);
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

  //set player
  useEffect(() => {
    localStorage.setItem(roomName, player);
  }, [player]);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <SocketProvider roomName={roomName}>
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-black text-white">
        <p>{message}</p>
        {loading ? (
          <Loading />
        ) : (
          <>
            {isRoomCreater ? (
              <>
                <h1>Choose your symbol</h1>
                <label>
                  Select Option:
                  <select value={selectedOption} onChange={handleChange}>
                    <option value="X">X</option>
                    <option value="O">O</option>
                  </select>
                </label>
                <StartMatch roomName={roomName} symbol={selectedOption} />{" "}
              </>
            ) : (
              <>
                <Ready roomName={roomName} />
              </>
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
