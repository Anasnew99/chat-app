import Joi from "joi";
import { idValidator, passwordValidator } from "./GeneralValidators";

const loginValidator = Joi.object({
  password: passwordValidator,
  participantId: idValidator,
});

export { loginValidator };
