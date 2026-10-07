import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../types/authRequest";
import { AuthService } from "../services/authService";
import { courseRepository } from "../repositories/courseRepository";
import { quizRepository } from "../repositories/quizRepository";
import { userRepository } from "../repositories/userRepository";
import { enrollRepository } from "../repositories/enrollmentRepository";
import { lessonRepository } from "../repositories/lessonRepository";
import { reviewRepository } from "../repositories/reviewRepository";
import { commentRepository } from "../repositories/commentRepository";
import { progressRepository } from "../repositories/progressRepository";
import { QuestionRepository } from "../repositories/questionRepository";
import { jwtSecret } from "../config/jwt";

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
    const decoded = jwt.verify(token!, jwtSecret) as JwtPayload & Decoded;

    const freshUser = await authService.getUserByEmail(decoded.email);
    if (!freshUser || freshUser.deleted || freshUser.id !== decoded.id) {
      res.status(401).json({ error: "User is no longer authorized" });
      return;
    }

    (req as AuthRequest).user = freshUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token!" });
  }
};

export const authorizeRole = (requiredRoles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = (req as AuthRequest).user;

    if (!user || !requiredRoles.includes(user.role)) {
      res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
      return;
    }
    next();
  };
};

export const authorizeCourseOwnerOrAdmin: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = (req as AuthRequest).user;
  const courseId = Number(req.params.id);
  if (!Number.isInteger(courseId) || courseId <= 0) {
    res.status(400).json({ message: "Invalid course ID" });
    return;
  }

  try {
    const course = await courseRepository.findOne({
      where: { id: courseId },
      relations: ["creator"],
    });
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    if (
      user?.role !== "admin" &&
      course.creator?.id !== user?.id
    ) {
      res.status(403).json({ message: "You cannot manage this course" });
      return;
    }
    next();
  } catch (error) {
    console.error("Error checking course access:", error);
    res.status(500).json({ message: "Could not verify course access" });
  }
};

export const authorizeQuizCourseOwnerOrAdmin: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = (req as AuthRequest).user;
  const quizId = Number(req.params.id);
  if (!Number.isInteger(quizId) || quizId <= 0) {
    res.status(400).json({ message: "Invalid quiz ID" });
    return;
  }

  try {
    const quiz = await quizRepository.findOne({
      where: { id: quizId },
      relations: ["course", "course.creator"],
    });
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    if (
      user?.role !== "admin" &&
      quiz.course?.creator?.id !== user?.id
    ) {
      res.status(403).json({ message: "You cannot manage this quiz" });
      return;
    }
    next();
  } catch (error) {
    console.error("Error checking quiz access:", error);
    res.status(500).json({ message: "Could not verify quiz access" });
  }
};

type OwnedResource = "enrollment" | "lesson" | "review" | "comment" | "progress" | "question";

async function canManageOwnedResource(
  resource: OwnedResource,
  id: number,
  userId: number
): Promise<boolean> {
  switch (resource) {
    case "enrollment": {
      const item = await enrollRepository.findOne({ where: { id }, relations: ["user"] });
      return item?.user.id === userId;
    }
    case "lesson": {
      const item = await lessonRepository.findOne({
        where: { id },
        relations: ["course", "course.creator"],
      });
      return item?.course.creator.id === userId;
    }
    case "review": {
      const item = await reviewRepository.findOne({ where: { id }, relations: ["user"] });
      return item?.user.id === userId;
    }
    case "comment": {
      const item = await commentRepository.findOne({ where: { id }, relations: ["user"] });
      return item?.user.id === userId;
    }
    case "progress": {
      const item = await progressRepository.findOne({ where: { id }, relations: ["user"] });
      return item?.user.id === userId;
    }
    case "question": {
      const item = await QuestionRepository.findOne({
        where: { id },
        relations: ["quiz", "quiz.course", "quiz.course.creator"],
      });
      return item?.quiz.course.creator.id === userId;
    }
  }
}

function authorizeOwnedResourceOrAdmin(resource: OwnedResource): RequestHandler {
  return async (req, res, next) => {
    const user = (req as AuthRequest).user;
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: `Invalid ${resource} ID` });
      return;
    }
    if (user?.role === "admin") {
      next();
      return;
    }
    if (!user) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }
    try {
      if (!(await canManageOwnedResource(resource, id, user.id))) {
        res.status(404).json({ message: `${resource} not found or access denied` });
        return;
      }
      next();
    } catch (error) {
      console.error(`Error checking ${resource} access:`, error);
      res.status(500).json({ message: `Could not verify ${resource} access` });
    }
  };
}

export const authorizeUserSelfOrAdmin: RequestHandler = (req, res, next) => {
  const user = (req as AuthRequest).user;
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }
  if (user?.role !== "admin" && user?.id !== id) {
    res.status(403).json({ message: "You cannot access this user" });
    return;
  }
  next();
};

export const authorizeUserSelfOrAdminForParam: RequestHandler = (
  req,
  res,
  next
) => {
  const user = (req as AuthRequest).user;
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }
  if (user?.role !== "admin" && user?.id !== id) {
    res.status(403).json({ message: "You cannot access this user's data" });
    return;
  }
  next();
};

export const authorizeEnrollmentOwnerOrAdmin = authorizeOwnedResourceOrAdmin("enrollment");
export const authorizeLessonOwnerOrAdmin = authorizeOwnedResourceOrAdmin("lesson");
export const authorizeReviewOwnerOrAdmin = authorizeOwnedResourceOrAdmin("review");
export const authorizeCommentOwnerOrAdmin = authorizeOwnedResourceOrAdmin("comment");
export const authorizeProgressOwnerOrAdmin = authorizeOwnedResourceOrAdmin("progress");
export const authorizeQuestionOwnerOrAdmin = authorizeOwnedResourceOrAdmin("question");

export const authorizeCourseOwnerOrAdminFromBody: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = (req as AuthRequest).user;
  const courseId = Number(req.body.courseId);
  if (!Number.isInteger(courseId) || courseId <= 0) {
    res.status(400).json({ message: "Invalid course ID" });
    return;
  }
  if (user?.role === "admin") {
    next();
    return;
  }
  try {
    const course = await courseRepository.findOne({
      where: { id: courseId },
      relations: ["creator"],
    });
    if (!course || course.creator.id !== user?.id) {
      res.status(403).json({ message: "You cannot manage this course" });
      return;
    }
    next();
  } catch (error) {
    console.error("Error checking course access:", error);
    res.status(500).json({ message: "Could not verify course access" });
  }
};

export const authorizeEnrollmentSelfOrAdmin: RequestHandler = async (req, res, next) => {
  const user = (req as AuthRequest).user;
  const enrollmentId = Number(req.params.id);
  if (!Number.isInteger(enrollmentId) || enrollmentId <= 0) {
    res.status(400).json({ message: "Invalid enrollment ID" });
    return;
  }
  if (user?.role === "admin") {
    next();
    return;
  }
  try {
    const enrollment = await enrollRepository.findOne({
      where: { id: enrollmentId },
      relations: ["user"],
    });
    if (!enrollment || enrollment.user.id !== user?.id) {
      res.status(404).json({ message: "Enrollment not found or access denied" });
      return;
    }
    next();
  } catch (error) {
    console.error("Error checking enrollment access:", error);
    res.status(500).json({ message: "Could not verify enrollment access" });
  }
};

export const authorizeQuizOwnerOrAdminFromBody: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = (req as AuthRequest).user;
  const quizId = Number(req.body.quiz?.id ?? req.body.quizId);
  if (!Number.isInteger(quizId) || quizId <= 0) {
    res.status(400).json({ message: "Invalid quiz ID" });
    return;
  }
  if (user?.role === "admin") {
    next();
    return;
  }
  try {
    const quiz = await quizRepository.findOne({
      where: { id: quizId },
      relations: ["course", "course.creator"],
    });
    if (!quiz || quiz.course.creator.id !== user?.id) {
      res.status(403).json({ message: "You cannot manage this quiz" });
      return;
    }
    next();
  } catch (error) {
    console.error("Error checking quiz access:", error);
    res.status(500).json({ message: "Could not verify quiz access" });
  }
};
