import { Document, Schema, model } from "mongoose";

interface IRoom {
  name: string;
  owner: string;
  password?: string;
  is_public?: boolean;
}

const RoomSchema = new Schema<IRoom>({
  name: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
  is_public: {
    required: false,
    type: Boolean,
    default: true,
  },
});

const Room = model<IRoom>("Room", RoomSchema);

export { Room, IRoom };
