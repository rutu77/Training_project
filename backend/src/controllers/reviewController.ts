import { Request, Response } from 'express';
import { ReviewService } from '../services/reviewService';
import { Review } from '../models/Review';

const reviewService = new ReviewService();

export class ReviewController {
  
  async createReview(req: Request, res: Response){
    const reviewData = req.body;
    try {
      const review = await reviewService.createreview(reviewData);
      res.status(201).json({ message: "review created successfully!", data: review });
    } catch (error) {
      res.status(500).json({ error: "Error creating review" });
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

  async updateReview(req: Request, res: Response): Promise<void> {
    const reviewId = Number(req.params.id);
    const data = req.body;
    try {
      const updatedReview = await reviewService.updateReviewById(reviewId, data);
      res.status(200).json({message:"Review updated successfully", data: updatedReview });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    const reviewId = Number(req.params.id);
    try {
      await reviewService.deleteReview(reviewId);
      res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
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

  // async getMeanRatings(req: Request, res: Response): Promise<void> {
  //   const courseId= Number(req.params.id);
  //   try {
  //     const ratings = await reviewService.getMeanRating(courseId);
  //     res.status(200).json(ratings);
  //   } catch (error) {
  //     res.status(500).json({ error: "Error fetching ratings" });
  //   }
  // }
}