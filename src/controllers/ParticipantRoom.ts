import { Document, Schema, model } from "mongoose";

interface IPRoom {
  r_id: string;
  p_id: string;
}

const PRoomSchema = new Schema<IPRoom>({
  r_id: {
    required: true,
    ref: "Room",
    type: Schema.Types.ObjectId,
  },
  p_id: {
    required: true,
    ref: "Participant",
    type: Schema.Types.ObjectId,
  },
});

const PRoom = model<IPRoom>("PRoom", PRoomSchema);

export { PRoom, IPRoom };
