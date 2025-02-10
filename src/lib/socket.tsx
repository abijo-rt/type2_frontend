// lib/socket.js
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://192.168.137.1:3001"; // Replace with your server URL

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"], // Use WebSocket for better performance
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket has not been initialized.");
  }
  return socket;
};
