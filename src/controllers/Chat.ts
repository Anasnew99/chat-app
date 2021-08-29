import { Document, Schema, model } from "mongoose";

interface IChat {
  pr_id: string;
  message: string;
}

const ChatSchema = new Schema<IChat>({
  pr_id: {
    required: true,
    ref: "PRoom",
    type: Schema.Types.ObjectId,
  },
  message: {
    required: true,
    type: String,
  },
});

const Chat = model<IChat>("Chat", ChatSchema);

export { Chat, IChat };
