import express, { Request, Response } from "express";
import {
  ACCESS_ERROR,
  DATA_VALIDATION_ERROR,
  DELETE_SUCCESS,
  POST_SUCCESS,
  PUT_SUCCESS,
  SERVER_ERROR,
} from "../config/constants";
import { IParticipant, Participant } from "../controllers/Participant";
import { sendResponse } from "../utils";
import { ITokenData } from "../utils/authUtils";
import {
  ParticipantDeleteValidator,
  ParticipantPostValidator,
  ParticipantPutValidator,
} from "../validators/Participant";
const participantRouter = express.Router();

interface ParticipantParams {
  id: string;
}

participantRouter
  .route("/")
  .get((req: Request<ParticipantParams, {}, { password?: string }>, res) => {})
  .put(
    async (
      req: Request<
        ParticipantParams,
        {},
        {
          new_password?: string;
          new_participantId: string;
          current_password?: string;
        }
      >,
      res: Response<{}, { claims: ITokenData }>
    ) => {
      const { error } = ParticipantPutValidator.validate(req.body);
      if (error) {
        return sendResponse(res, DATA_VALIDATION_ERROR);
      }
      try {
        const { current_password, new_password, new_participantId } = req.body;
        const id = res.locals.claims.id;
        const participant = await Participant.findById(id);
        if (current_password) {
          if (participant.password === current_password) {
            await participant.updateOne({
              password: new_password,
              participantId: new_participantId,
            });
          } else {
            throw ACCESS_ERROR;
          }
        } else {
          if (participant.password) {
            throw ACCESS_ERROR;
          } else {
            await participant.updateOne({
              password: new_password,
              participantId: new_participantId,
            });
          }
        }
        return sendResponse(res, PUT_SUCCESS);
      } catch (error) {
        return sendResponse(res, error);
      }
    }
  )
  .delete(
    async (req: Request<ParticipantParams, {}, { password?: string }>, res) => {
      const id = res.locals.claims.id;
      const { error } = ParticipantDeleteValidator.validate(req.body);
      if (error) {
        return sendResponse(res, DATA_VALIDATION_ERROR);
      }
      const { password } = req.body;
      try {
        const data = await Participant.findById(id);
        if (data) {
          if (data.password) {
            if (data.password === password) {
              await data.deleteOne();
            } else {
              throw ACCESS_ERROR;
            }
          } else {
            await data.deleteOne();
          }
        }

        return sendResponse(res, DELETE_SUCCESS);
      } catch (error) {
        console.log(error);
        return sendResponse(res, error);
      }
    }
  );

export default participantRouter;
