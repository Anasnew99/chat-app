import express, { Request } from "express";
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
import {
  ParticipantDeleteValidator,
  ParticipantPostValidator,
  ParticipantPutValidator,
} from "../validators/Participant";
const participantRouter = express.Router();

participantRouter.post("/", (req: Request<{}, {}, IParticipant>, res) => {
  const { error } = ParticipantPostValidator.validate(req.body);
  if (error) {
    return sendResponse(res, DATA_VALIDATION_ERROR);
  }
  const values = req.body;
  const newParticipant = new Participant(values);
  newParticipant
    .save()
    .then(() => {
      return sendResponse(res, POST_SUCCESS);
    })
    .catch(() => {
      return sendResponse(res, SERVER_ERROR);
    });
});

interface ParticipantParams {
  id: string;
}

participantRouter
  .route("/:id")
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
      res
    ) => {
      const { error } = ParticipantPutValidator.validate(req.body);
      if (error) {
        return sendResponse(res, DATA_VALIDATION_ERROR);
      }
      try {
        const { current_password, new_password, new_participantId } = req.body;
        const id = req.params.id;
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
      const id = req.params.id;
      const { error } = ParticipantDeleteValidator.validate(req.body);
      if (error) {
        return sendResponse(res, DATA_VALIDATION_ERROR);
      }
      const { password } = req.body;
      try {
        const data = await Participant.findById(id);

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
        console.log(error);
        return sendResponse(res, error);
      }
    }
  );

export default participantRouter;
