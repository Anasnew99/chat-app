import Joi from "joi";
import { idValidator, passwordValidator } from "./GeneralValidators";

const ParticipantPostValidator = Joi.object({
  participantId: idValidator,
  password: passwordValidator,
});

const ParticipantPutValidator = Joi.object({
  current_password: passwordValidator,
  new_password: passwordValidator,
  new_participantId: idValidator,
});

const ParticipantDeleteValidator = Joi.object({
  password: passwordValidator,
});

export {
  ParticipantPostValidator,
  ParticipantPutValidator,
  ParticipantDeleteValidator,
};
