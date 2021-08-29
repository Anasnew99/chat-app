import { HTTP_Status, SERVER_ERROR } from "../config/constants";
import { Response } from "express-serve-static-core";

const sendResponse = (res: Response, body: HTTP_Status) => {
  if (body.m_code) {
    return res.status(body.code).json(body);
  } else {
    return res.status(SERVER_ERROR.code).json(SERVER_ERROR);
  }
};

export { sendResponse };
