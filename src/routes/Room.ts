import express, { Request } from "express";
import {
  DATA_VALIDATION_ERROR,
  POST_SUCCESS,
  SERVER_ERROR,
  ACCESS_ERROR,
  PUT_SUCCESS,
} from "../config/constants";
import { IRoom, Room } from "../controllers/RoomController";
import { sendResponse } from "../utils";
import { RoomPostValidator, RoomPutValidator } from "../validators/Room";

const roomRouter = express.Router();

// Create Room
roomRouter.post("/", (req: Request<{}, {}, IRoom>, res) => {
  const { error } = RoomPostValidator.validate(req.body);
  if (error) {
    return sendResponse(res, DATA_VALIDATION_ERROR);
  }
  const values = req.body;
  const newRoom = new Room(values);
  newRoom
    .save()
    .then(() => {
      return sendResponse(res, POST_SUCCESS);
    })
    .catch(() => {
      return sendResponse(res, SERVER_ERROR);
    });
});

interface RoomParams {
  id: string;
}

roomRouter
  .route("/:id")
  .get((req: Request<RoomParams, {}, { password?: string }>, res) => {})
  .put(
    async (
      req: Request<
        RoomParams,
        {},
        { new_password?: string; new_roomId: string; current_password?: string }
      >,
      res
    ) => {
      const { error } = RoomPutValidator.validate(req.body);
      if (error) {
        return sendResponse(res, DATA_VALIDATION_ERROR);
      }
      try {
        const { current_password, new_password, new_roomId } = req.body;
        const id = req.params.id;
        const room = await Room.findById(id);
        if (current_password) {
          if (room.password === current_password) {
            await room.updateOne({
              password: new_password,
              roomId: new_roomId,
            });
          } else {
            throw ACCESS_ERROR;
          }
        } else {
          if (room.password) {
            throw ACCESS_ERROR;
          } else {
            await room.updateOne({
              password: new_password,
              roomId: new_roomId,
            });
          }
        }
        return sendResponse(res, PUT_SUCCESS);
      } catch (error) {
        return sendResponse(res, error);
      }
    }
  )
  .delete((req, res) => {});

export default roomRouter;
