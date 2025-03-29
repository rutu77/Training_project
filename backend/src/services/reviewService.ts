import { Review } from "../models/Review";
import { reviewRepository } from "../repositories/reviewRepository";

export class ReviewService{
    async getReviewById(id: number){
        const review = await reviewRepository.findOne({ where: { review_id: id } });
        if (!review) throw new Error("Review not found!");
        return review;
    }

    async updateReviewById(id: number, data: Partial<Review>){
        await reviewRepository.update(id, data);
        const updatedReview = await reviewRepository.findOne({ where: { review_id: id } });
        if (!updatedReview) throw new Error("Review not found!");
        return updatedReview;
    }

    async deleteReview(id: number){
        const result = await reviewRepository.delete(id);
        if (result.affected === 0) throw new Error("Review not found!");
    }

    async getAllReviews(){
        return await reviewRepository.find();
    }
}