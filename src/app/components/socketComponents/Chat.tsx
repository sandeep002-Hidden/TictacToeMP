import { useState, useEffect } from "react";
import { useSocket } from "@/context/SocketContext";
interface ChatProps {
  roomName: string;
  player: number;
}
export default function Chat({ roomName, player }: ChatProps) {
  const { socket, sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("chatMessage", (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, [socket]);
  const handleSendMessage = () => {
    sendMessage(roomName, message);
    setMessage("")
  };
  return (
    <div className="absolute z-20 bottom-10 left-10 h-fit flex justify-center items-center flex-col w-30vw bg-gray-900 rounded-xl p-4">
      <div className={` text-xs messages flex items-center justify-end h-50vh  w-full flex-col overflow-y-scroll`}>
        {messages.map((msg, index) => (
          <div key={index} className={`m-1 h-fit py-1 bg-slate-800 rounded-xl w-10/12 flex  items-start ${msg.userId === socket.id?"justify-end":"justify-start"} break-all`}>
            <div className=" ml-1 w-fit break-keep">
              {msg.userId === socket.id
                ? "You"
                : `player${player == 1 ? "2" : "1"}`}
              :{" "}
            </div>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center ">
        <input
          type="text"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="h-12 w-64 rounded-md active:border-none"
        />
        <button onClick={handleSendMessage}
        className="w-24 h-12 bg-black border-2 border-black rounded-xl"
        >Send ➡️ </button>
      </div>
    </div>
  );
}
