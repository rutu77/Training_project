import { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService';
import { Review } from '../models/Review';


export class ReviewController {
  reviewService = new ReviewService();

  async getReviewById(req: Request, res: Response): Promise<void> {
    const reviewId = Number(req.params.id);
    try {
      const review = await this.reviewService.getReviewById(reviewId);
      res.status(200).json({ data: review });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async updateReview(req: Request, res: Response): Promise<void> {
    const reviewId = Number(req.params.id);
    const data = req.body;
    try {
      const updatedReview = await this.reviewService.updateReviewById(reviewId, data);
      res.status(200).json({message:"Review updated successfully", data: updatedReview });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    const reviewId = Number(req.params.id);
    try {
      await this.reviewService.deleteReview(reviewId);
      res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await this.reviewService.getAllReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Error fetching reviews" });
    }
  }
}