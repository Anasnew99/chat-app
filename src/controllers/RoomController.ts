import { Document, Schema, model } from "mongoose";

interface IRoom {
  roomId: string;
  password?: string;
}

const RoomSchema = new Schema<IRoom>({
  roomId: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
});

const Room = model<IRoom>("Room", RoomSchema);

export { Room, IRoom };
