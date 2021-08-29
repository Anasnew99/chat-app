import Joi from "joi";

const passwordValidator = Joi.string().pattern(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
);

const idValidator = Joi.string()
  .pattern(/[\-a-zA-Z0-9!@#$%^&*]{6,16}$/)
  .required();

export { passwordValidator, idValidator };
