interface HTTP_Status {
  code: number;
  msg: string;
  m_code: string;
}

const DATA_VALIDATION_ERROR = {
  code: 422,
  msg: "Data Validation Error",
  m_code: "http-err-1",
};

const SERVER_ERROR = {
  code: 400,
  msg: "Server Error",
  m_code: "http-err-2",
};

const POST_SUCCESS = {
  code: 201,
  msg: "Created",
  m_code: "http-suc-1",
};

const PUT_SUCCESS = {
  code: 200,
  msg: "Updated",
  m_code: "http-suc-2",
};

const DELETE_SUCCESS = {
  code: 200,
  msg: "Deleted",
  m_code: "http-suc-3",
};

const ACCESS_ERROR = {
  code: 403,
  msg: "Don't have access to this resource",
  m_code: "http-err-3",
};

const DUPLICATE_ERROR = {
  code: 409,
  msg: "Resource already exist",
  m_code: "http-err-4",
};

const NOT_EXIST_ERROR = {
  code: 404,
  msg: "Resource not exist",
  m_code: "http-err-5",
};

export {
  DATA_VALIDATION_ERROR,
  SERVER_ERROR,
  POST_SUCCESS,
  ACCESS_ERROR,
  PUT_SUCCESS,
  DELETE_SUCCESS,
  DUPLICATE_ERROR,
  NOT_EXIST_ERROR,
  HTTP_Status,
};
