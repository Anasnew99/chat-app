import express from "express";
import apiRouter from "./routes/index";
import dotenv from "dotenv";
import initDB from "./core/db";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  res.send("Pong again");
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  initDB((error) => {
    if (!error) {
      console.log("DB Connected");
    }
  });
  console.log("Server Started at", PORT);
});
