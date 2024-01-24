import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";

import { API_PREFIX } from "./config/config";
import logging from "./config/logging";
import { serverHealthCheck } from "./controllers/helper";

const HTTP_PORT: string | number = process.env.HTTP_PORT || 8000;

const app = express();

app.use(bodyParser.json());

app.use(
  cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] })
);

app.get(`${API_PREFIX}/check`, serverHealthCheck);

app.listen(HTTP_PORT, () =>
  logging("info", "", `Server is up on port ${HTTP_PORT}`)
);
