import express, { Request } from "express";
import {
  DATA_VALIDATION_ERROR,
  POST_SUCCESS,
  SERVER_ERROR,
  ACCESS_ERROR,
  PUT_SUCCESS,
  DELETE_SUCCESS,
} from "../config/constants";
import { IRoom, Room } from "../controllers/RoomController";
import { sendResponse } from "../utils";
import {
  RoomDeleteValidator,
  RoomPostValidator,
  RoomPutValidator,
} from "../validators/Room";

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
  .delete(async (req: Request<RoomParams, {}, { password?: string }>, res) => {
    const id = req.params.id;
    const { error } = RoomDeleteValidator.validate(req.body);
    if (error) {
      return sendResponse(res, DATA_VALIDATION_ERROR);
    }
    const { password } = req.body;
    try {
      const data = await Room.findById(id);
      if (data.password) {
        if (data.password === password) {
          await data.deleteOne();
        } else {
          throw ACCESS_ERROR;
        }
      } else {
        await data.deleteOne();
      }
      return sendResponse(res, DELETE_SUCCESS);
    } catch (error) {
      return sendResponse(res, error);
    }
  });

export default roomRouter;
