import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import http from "http";

import { API_PREFIX } from "./config/config";
import logging from "./config/logging";
import ServerConfig from "./config/config";
import { serverHealthCheck } from "./controllers/helper";

const HTTP_PORT: string | number = process.env.HTTP_PORT || 8000;
const NAMESPACE: string = "Server";

const app = express();

// Middlewares
app.use(bodyParser.json());

app.use(
  cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  logging(
    "info",
    NAMESPACE,
    `Method - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging(
      "info",
      NAMESPACE,
      `Method - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}] Status - [${res.statusCode}]`
    );
  });

  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get(`${API_PREFIX}/check`, serverHealthCheck);

/** Notfound middleware */
app.use((_: Request, res: Response, next: NextFunction) =>
  res.status(404).json({ message: new Error("Not found").message })
);

const httpServer = http.createServer(app);

httpServer.listen(ServerConfig.port, () =>
  logging(
    "info",
    NAMESPACE,
    `Server is running on ${ServerConfig.hostname}:${ServerConfig.port}`
  )
);
