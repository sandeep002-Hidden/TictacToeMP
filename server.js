import { createServer } from "node:http";
import "dotenv/config";
import next from "next";
import { Server } from "socket.io";
import Game from "./src/model/game.model.js";
import connect from "./src/database/connect.js";
import Room from "./src/model/room.model.js";

connect();
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);
  const roomReadyStates = {};
  const availablePlayers = {};
  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);

      if (!roomReadyStates[roomName]) {
        roomReadyStates[roomName] = {
          player2: false,
        };
      }
      socket
        .to(roomName)
        .emit("userJoined", `User ${socket.id} has joined the room.`);
    });
    socket.on("chatMessage", (roomName, message) => {
      io.to(roomName).emit("chatMessage", {
        userId: socket.id,
        message: message,
      });
    });
    socket.on("readyforGame", (roomName, isReady) => {
      roomReadyStates[roomName].player2 = isReady;
      console.log(roomReadyStates[roomName]);
      io.to(roomName).emit("startMatch");
    });
    socket.on("startMatch", async (roomName) => {
      if (!roomReadyStates[roomName].player2) {
        console.log("qqq");
        io.to(roomName).emit("wait", {
          message: "Wait for getting ready",
          roomName,
        });
        return;
      }
      try {
        console.log(roomReadyStates);
        const newGame = new Game();
        await newGame.save({});
        console.log(newGame);
        console.log("start match");
        io.to(roomName).emit("matchStarted", {
          newGame: newGame._id,
          roomName,
        });
      } catch (error) {
        console.error("Error saving new game:", error.message);
      }
    });
    socket.on("gamestart", (GameId) => {
      socket.join(GameId);
    });
    socket.on("move", (gameId, symbol, newList) => {
      socket.to(gameId).emit("move", { symbol, newList });
    });
    socket.on("winner", async (gameId, moves, winner, winmove, roomId) => {
      console.log(typeof roomId);
      console.log(typeof gameId);
      await Game.findByIdAndUpdate(gameId, {
        $set: { winner: winner, moves: moves, GameOver: true },
      });
      await Room.findOneAndUpdate(
        { RoomName: roomId },
        { $set: { player1: "", player2: "", isOpen: true } }
      );
      socket.to(gameId).emit("winner", { winner, winmove, roomId });
    });
    socket.on("joined-vsGlobe", (roomName) => {
      socket.join(roomName);
      io.to(roomName).emit("userJoined", { message: "user joined" });
    });
    socket.on("svGobmatch", async (roomName) => {
      const room = await Room.findOne({ RoomName: roomName });
      const newGame = new Game({
        player1: room.player1,
        player2: room.player2,
      });
      await newGame.save();
      io.to(roomName).emit("gobMatchStarted", {
        newGame: newGame._id,
        roomName,
        admin: Math.round(Math.random() * (2 - 1) + 1),
      });
    });
    socket.on("disconnect", () => {
      console.log("User is disconnected:");
    });
  });
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
