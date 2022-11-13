import { Socket } from "socket.io-client";
import { Room } from "./room";
import { User } from "./user";

export interface RoomView {
  room: Room;
  user: User;
  socket: Socket;
}
