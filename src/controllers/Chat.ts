import { Document, Schema, model } from "mongoose";

interface IChat {
  r_id: string;
  p_id: string;
  message: string;
}

const ChatSchema = new Schema<IChat>({
  p_id: {
    required: true,
    ref: "Participant",
    type: Schema.Types.ObjectId,
  },
  r_id: {
    required: true,
    ref: "Room",
    type: Schema.Types.ObjectId,
  },
  message: {
    required: true,
    type: String,
  },
});

const Chat = model<IChat>("Chat", ChatSchema);

export { Chat, IChat };
