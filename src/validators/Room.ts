import Joi from "joi";
import { idValidator, passwordValidator } from "./GeneralValidators";

const RoomPostValidator = Joi.object({
  password: passwordValidator,
  roomId: idValidator,
});

const RoomPutValidator = Joi.object({
  current_password: passwordValidator,
  new_password: passwordValidator,
  new_roomId: idValidator,
});

const RoomDeleteValidator = Joi.object({
  password: passwordValidator,
});

export { RoomPostValidator, RoomPutValidator, RoomDeleteValidator };
