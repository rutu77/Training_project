import { Course } from "../models/Course";
import { Review } from "../models/Review";
import { User } from "../models/User";
import { reviewRepository } from "../repositories/reviewRepository";
import { userRepository } from "../repositories/userRepository";
import { courseRepository } from "../repositories/courseRepository";

export class ReviewService{

    async createreview(reviewData:{comment:string;courseId:number;rating:number}, userId:number){
        const user = await userRepository.findOne({ where: { id: userId } }) as User;
        const course = await courseRepository.findOne({ where: { id: reviewData.courseId } }) as Course;
        if (!user || !course) throw new Error("User or course not found");
        const review = reviewRepository.create({
            comment: reviewData.comment,
            rating: reviewData.rating,
            user,
            course,
        });
        return await reviewRepository.save(review);
    }
       
    async getReviewById(id: number){
        const review = await reviewRepository.findOne({
            where: {id, deleted:false},
            relations:["user", "course"],
        });
        if (!review) throw new Error("Review not found!");
        return review;
    }

    async getReviewByCourseId(courseId: number) {
        const reviews= await reviewRepository.find({
            where: { course: { id: courseId }, deleted:false },
            relations: ['course','user'],
        })
        return reviews;
    }

    async updateReviewById(id: number, data: { rating?: number; comment?: string }, userId: number, isAdmin: boolean){
        const review = await reviewRepository.findOne({ where: { id }, relations: ["user", "course"] });
        if (!review) throw new Error("Review not found!");
        if (!isAdmin && review.user.id !== userId) throw new Error("You cannot update this review");
        if (data.rating !== undefined) review.rating = data.rating;
        if (data.comment !== undefined) review.comment = data.comment;
        return reviewRepository.save(review);
    }

    async deleteReview(id: number, userId: number, isAdmin: boolean){
        const review = await reviewRepository.findOne({ where: { id }, relations: ["user"] });
        if (!review) throw new Error("Review not found!");
        if (!isAdmin && review.user.id !== userId) throw new Error("You cannot delete this review");
        review.deleted = true;
        await reviewRepository.save(review);
    }

    async getAllReviews(){
        return await reviewRepository.find({
            where:{deleted:false},
            relations:['course','user'],
        });
    }

}
