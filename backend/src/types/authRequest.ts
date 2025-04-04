import { Request } from "express";

export interface AuthRequest extends Request{
    user?:any;
}



declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}
