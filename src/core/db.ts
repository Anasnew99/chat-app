import mongoose, { CallbackError } from "mongoose";

const initDB = (onComplete: (error: CallbackError) => void) => {
  const DB_URL = process.env.DB_URL;
  mongoose.connect(
    DB_URL,
    {
      useNewUrlParser: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PWD,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (error) => {
      onComplete(error);
    }
  );
};

// mongoose.connect()

export default initDB;
