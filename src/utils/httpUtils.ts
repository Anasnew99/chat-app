import {
  DATA_VALIDATION_ERROR,
  HTTP_Status,
  PUT_SUCCESS,
  SERVER_ERROR,
} from "../config/constants";
import { Response } from "express-serve-static-core";
import Joi from "joi";

const sendResponse = (res: Response, body: HTTP_Status) => {
  if (body.m_code) {
    return res.status(body.code).json(body);
  } else {
    return res.status(SERVER_ERROR.code).json(SERVER_ERROR);
  }
};

const validator = async (data: any, joiValidatorObject: Joi.ObjectSchema) => {
  return new Promise(
    (
      resolve: (value?: undefined) => any,
      reject: (err: HTTP_Status) => any
    ) => {
      const { error } = joiValidatorObject.validate(data);
      if (error) {
        reject(DATA_VALIDATION_ERROR);
      } else {
        resolve();
      }
    }
  );
};

const getSuccessMessage = (data: any, message?: string): HTTP_Status => {
  return {
    ...PUT_SUCCESS,
    data: data,
    msg: message ? message : PUT_SUCCESS.msg,
  };
};

export { sendResponse, validator, getSuccessMessage };
