import { Request, Response } from "express";
import { ReviewService } from "../services/reviewService";
import { Review } from "../models/Review";
import { AuthRequest } from "../types/authRequest";

const reviewService = new ReviewService();

export class ReviewController {
  async createReview(req: Request, res: Response) {
    const user = (req as AuthRequest).user;
    const { comment, courseId, rating } = req.body;
    const parsedCourseId = Number(courseId);
    const parsedRating = Number(rating);
    if (!user || !Number.isInteger(parsedCourseId) || parsedCourseId <= 0 ||
        !Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      res.status(400).json({ message: "A valid course ID and rating from 1 to 5 are required" });
      return;
    }

    try {
      const review = (await reviewService.createreview({
        comment,
        courseId: parsedCourseId,
        rating: parsedRating,
      }, user.id)) as Review;
      res
        .status(201)
        .json({ message: "review created successfully!", data: review });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getReviewById(req: Request, res: Response): Promise<void> {
    const reviewId = Number(req.params.id);
    try {
      const review = await reviewService.getReviewById(reviewId);
      res.status(200).json({ data: review });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getReviewByCourseId(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    try {
      const review = await reviewService.getReviewByCourseId(courseId);
      res.status(200).json({ data: review });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async updateReview(req: Request, res: Response): Promise<void> {
    const user = (req as AuthRequest).user;
    if (!user) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }
    const reviewId = Number(req.params.id);
    const { rating, comment } = req.body;
    if (rating !== undefined && (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5)) {
      res.status(400).json({ message: "Rating must be an integer from 1 to 5" });
      return;
    }
    if (comment !== undefined && typeof comment !== "string") {
      res.status(400).json({ message: "Comment must be text" });
      return;
    }
    try {
      const updatedReview = await reviewService.updateReviewById(
        reviewId,
        { rating: rating === undefined ? undefined : Number(rating), comment },
        user.id,
        user.role === "admin"
      );
      res
        .status(200)
        .json({ message: "Review updated successfully", data: updatedReview });
    } catch (error) {
      res.status((error as Error).message.includes("cannot") ? 403 : 404).json({ message: (error as Error).message });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    const user = (req as AuthRequest).user;
    if (!user) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }
    const reviewId = Number(req.params.id);
    try {
      await reviewService.deleteReview(reviewId, user.id, user.role === "admin");
      res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
      res.status((error as Error).message.includes("cannot") ? 403 : 404).json({ message: (error as Error).message });
    }
  }

  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await reviewService.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Error fetching reviews" });
    }
  }
}
