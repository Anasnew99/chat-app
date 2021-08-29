import Joi from "joi";
import { idValidator, passwordValidator } from "./GeneralValidators";

const ParticipantRoomPut = Joi.object({
  r_id: idValidator,
  p_id: idValidator,
  r_password: passwordValidator,
  p_password: passwordValidator,
});

const ParticipantRoomDelete = Joi.object({
  r_id: idValidator,
  p_id: idValidator,
  r_password: passwordValidator,
  p_password: passwordValidator,
});

export { ParticipantRoomPut, ParticipantRoomDelete };
