import express, { Request } from "express";
import {
  ACCESS_ERROR,
  DATA_VALIDATION_ERROR,
  DELETE_SUCCESS,
  DUPLICATE_ERROR,
  NOT_EXIST_ERROR,
  POST_SUCCESS,
  PUT_SUCCESS,
  SERVER_ERROR,
} from "../config/constants";
import { Participant } from "../controllers/Participant";
import { PRoom } from "../controllers/ParticipantRoom";
import { Room } from "../controllers/RoomController";
import { sendResponse } from "../utils";
import {
  ParticipantRoomDelete,
  ParticipantRoomPut,
} from "../validators/ParticipantRoom";

const participantRoom = express.Router();

interface PRBody {
  r_id: string;
  p_id: string;
  p_password?: string;
  r_password?: string;
}

participantRoom.put("/", async (req: Request<{}, {}, PRBody>, res) => {
  const { error } = ParticipantRoomPut.validate(req.body);
  if (error) {
    return sendResponse(res, DATA_VALIDATION_ERROR);
  }
  const { r_id, p_id, p_password, r_password } = req.body;
  try {
    const roomData = await Room.findById(r_id);
    if (roomData.password) {
      if (roomData.password !== r_password) {
        throw ACCESS_ERROR;
      }
    }

    const participantData = await Participant.findById(p_id);
    if (participantData.password) {
      if (participantData.password !== p_password) {
        throw ACCESS_ERROR;
      }
    }

    const count = await PRoom.countDocuments({ r_id, p_id });
    if (count === 0) {
      const newParticipantRoom = new PRoom({ r_id: r_id, p_id: p_id });
      await newParticipantRoom.save();
      return sendResponse(res, PUT_SUCCESS);
    } else {
      throw DUPLICATE_ERROR;
    }
  } catch (error) {
    return sendResponse(res, error);
  }
});

participantRoom.delete("/", async (req: Request<{}, {}, PRBody>, res) => {
  const { error } = ParticipantRoomDelete.validate(req.body);
  if (error) {
    return sendResponse(res, DATA_VALIDATION_ERROR);
  }
  const { r_id, p_id, p_password, r_password } = req.body;
  try {
    const count = await PRoom.countDocuments({ r_id, p_id });
    if (count === 0) {
      throw NOT_EXIST_ERROR;
    } else {
      const roomData = await Room.findById(r_id);
      if (roomData.password) {
        if (roomData.password !== r_password) {
          throw ACCESS_ERROR;
        }
      }

      const participantData = await Participant.findById(p_id);
      if (participantData.password) {
        if (participantData.password !== p_password) {
          throw ACCESS_ERROR;
        }
      }
      await PRoom.findOneAndDelete({ r_id, p_id });
      return sendResponse(res, DELETE_SUCCESS);
    }
  } catch (error) {
    return sendResponse(res, error);
  }
});

export default participantRoom;
