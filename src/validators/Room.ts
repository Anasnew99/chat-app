import Joi from "joi";

const RoomPostValidator = Joi.object({
  name: Joi.string().max(20).required(),
  password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  ),
  is_public: Joi.boolean(),
  owner: Joi.string()
    .pattern(/[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .required(),
});

export { RoomPostValidator };
