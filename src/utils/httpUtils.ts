import { HTTP_Status } from "../config/constants";
import { Response } from "express-serve-static-core";

const sendRequest = (res: Response, body: HTTP_Status) => {
  return res.status(body.code).json(body);
};

export { sendRequest };
