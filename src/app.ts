import createError from "http-errors";
import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/dbConfig";
import { movieRouter } from "./routes/movieRoutes";

dotenv.config();

db.sync().then(() => {
  console.log("Successfully connected to the Database");
});

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/movies", movieRouter);

app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

export default app;