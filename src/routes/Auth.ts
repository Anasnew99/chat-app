import express, { Request, Response } from "express";
import { getSuccessMessage, sendResponse, validator } from "../utils";
import { generateToken, IUser, verifyUser } from "../utils/authUtils";
import { loginValidator } from "../validators/AuthValiators";

const authRouter = express.Router();

authRouter.post(
  "/login",
  async (req: Request<{}, {}, IUser>, res: Response) => {
    try {
      await validator(req.body, loginValidator);
      const claims = await verifyUser(req.body);
      const token = await generateToken(claims);
      return sendResponse(res, getSuccessMessage({ token }, "Authorized"));
    } catch (error) {
      return sendResponse(res, error);
    }
  }
);

export default authRouter;
