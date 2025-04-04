import { Review } from "../models/Review";
import { reviewRepository } from "../repositories/reviewRepository";

export class ReviewService{

    async createreview(reviewData: Partial<Review>){
        const review = reviewRepository.create(reviewData);
        return await reviewRepository.save(review);
    }
       
    async getReviewById(id: number){
        const review = await reviewRepository.findOne({ where: {id } });
        if (!review) throw new Error("Review not found!");
        return review;
    }

    async updateReviewById(id: number, data: Partial<Review>){
        await reviewRepository.update(id, data);
        const updatedReview = await reviewRepository.findOne({ where: {id } });
        if (!updatedReview) throw new Error("Review not found!");
        return updatedReview;
    }

    async deleteReview(id: number){
        const result = await reviewRepository.delete(id);
        if (result.affected === 0) throw new Error("Review not found!");
    }

    async getAllReviews(){
        return await reviewRepository.find({ relations:['course','user']});
    }

        
    // async getMeanRating(courseId: number){
    //     const reviews = await reviewRepository.find({ where: { course: { id: courseId } } });
    //     if (reviews.length === 0) {
    //     return 0;
    //     }
    //     const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    //     return totalRating / reviews.length;
    // }
}
