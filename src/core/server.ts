import express from "express";
import apiRouter from "../routes/index";
import initDB from "../core/db";
import bodyParser from "body-parser";
import { createServer } from "http";
import cors from "cors";
const app = express();
const server = createServer(app);
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  res.send("Pong again");
});

const PORT = Number(process.env.PORT) || 8080;

const startServer = () => {
  server.listen(PORT, () => {
    initDB((error) => {
      if (!error) {
        console.log("DB Connected");
      } else {
        console.error("Failed To Connect DB");
      }
    });
    console.log("Server Started at", PORT);
  });
};

export { startServer, server };
