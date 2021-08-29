import Joi from "joi";

const RoomPostValidator = Joi.object({
  password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  ),
  roomId: Joi.string()
    .pattern(/[\-a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

const RoomPutValidator = Joi.object({
  current_password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  ),
  new_password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  ),
  new_roomId: Joi.string()
    .pattern(/[\-a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

export { RoomPostValidator, RoomPutValidator };
