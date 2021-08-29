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

export { DATA_VALIDATION_ERROR, SERVER_ERROR, POST_SUCCESS, HTTP_Status };
