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
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.userId===socket.id?"You":`player${player==1?"2":"1"}`}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
