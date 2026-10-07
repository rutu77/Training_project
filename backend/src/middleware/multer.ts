import multer from "multer";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/appError";

const uploadDirectory = path.resolve(process.cwd(), "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (_req, file, cb) => {
    const extensionByType: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif",
    };
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${extensionByType[file.mimetype]}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 20,
    fieldSize: 100 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
    if (!acceptedTypes.has(file.mimetype)) {
      cb(new AppError("Only JPEG, PNG, WebP, and GIF image uploads are accepted", 400));
      return;
    }
    cb(null, true);
  },
});
