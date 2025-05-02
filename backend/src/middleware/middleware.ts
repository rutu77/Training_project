import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/authRequest";
import { AuthService } from "../services/authService";

const secretKey = "Rutuja1147";

interface Decoded {
  email: string;
  id: number;
  iat: number; //issued at
  exp: string; //expiration
}

const authService = new AuthService();

export const authenticateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.header("Authorization") ||
    !req.header("Authorization")?.startsWith("Bearer")
  ) {
    res.status(401).json({ error: "Access denied. No token provided" });
    return;
  }

  const token = req.header("Authorization")?.split(" ")[1];
  try {
    const decoded = jwt.verify(token!, secretKey) as JwtPayload & Decoded;

    const freshUser = await authService.getUserByEmail(decoded.email);
    console.log(freshUser);

    (req as AuthRequest).user = freshUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token!" });
  }
};

export const authorizeRole = (requiredRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as AuthRequest).user;
    console.log(user);

    if (!user || !requiredRoles.includes(user.role)) {
      res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
      return;
    }
    next();
  };
};
