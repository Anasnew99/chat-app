import { Document, Schema, model } from "mongoose";

interface IParticipant {
  participantId: string;
  password?: string;
}

const ParticipantSchema = new Schema<IParticipant>({
  participantId: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
});

const Participant = model<IParticipant>("Participant", ParticipantSchema);

export { Participant, IParticipant };
