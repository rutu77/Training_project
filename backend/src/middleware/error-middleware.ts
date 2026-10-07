import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { QueryFailedError } from "typeorm";
import { AppError } from "../utils/appError";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  if (err instanceof multer.MulterError) {
    const statusCode = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    res.status(statusCode).json({
      status: "error",
      message: statusCode === 413 ? "Uploaded file exceeds the size limit" : err.message,
    });
    return;
  }

  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ status: "error", message: "Request body contains invalid JSON" });
    return;
  }

  if (err instanceof QueryFailedError) {
    const code = (err as QueryFailedError & { driverError?: { code?: string } }).driverError?.code;
    if (code === "22P02" || code === "23502" || code === "23503") {
      res.status(400).json({ status: "error", message: "Request contains invalid or inconsistent data" });
      return;
    }
    if (code === "23505") {
      res.status(409).json({ status: "error", message: "A record with these details already exists" });
      return;
    }
  }

  console.error("Unhandled request error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
