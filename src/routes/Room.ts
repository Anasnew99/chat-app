import express, { Request } from "express";
import {
  DATA_VALIDATION_ERROR,
  POST_SUCCESS,
  SERVER_ERROR,
} from "../config/constants/http-status";
import { IRoom, Room } from "../controllers/RoomController";
import { sendRequest } from "../utils";
import { RoomPostValidator } from "../validators/Room";

const roomRouter = express.Router();

roomRouter
  .route("/")
  .get((req, res) => {})
  .post((req: Request<{}, {}, IRoom>, res) => {
    const { error } = RoomPostValidator.validate(req.body);
    if (error) {
      console.log(error);
      return sendRequest(res, DATA_VALIDATION_ERROR);
    }
    const values = req.body;
    const newRoom = new Room(values);
    newRoom
      .save()
      .then(() => {
        return sendRequest(res, POST_SUCCESS);
      })
      .catch(() => {
        return sendRequest(res, SERVER_ERROR);
      });
  })
  .put((req, res) => {})
  .delete((req, res) => {});

export default roomRouter;
