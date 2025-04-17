import { Course } from "../models/Course";
import { Review } from "../models/Review";
import { User } from "../models/User";
import { reviewRepository } from "../repositories/reviewRepository";

export class ReviewService{

    async createreview(reviewData:{comment:string,courseId:number,userId:number,rating:number}){

        const user = await reviewRepository.manager.findOne('User', { where: { id: reviewData.userId } }) as User;
        const course = await reviewRepository.manager.findOne('Course', { where: { id: reviewData.courseId } }) as Course;
        const review = reviewRepository.create({...reviewData, user, course});
        return await reviewRepository.save(review);
    }
       
    async getReviewById(id: number){
        const review = await reviewRepository.findOne({ where: {id } });
        if (!review) throw new Error("Review not found!");
        return review;
    }

    async getReviewByCourseId(courseId: number) {
        const reviews= await reviewRepository.find({
            where: { course: { id: courseId } },
            relations: ['course','user'],
        })
        if (reviews.length === 0) throw new Error("No reviews found for this course!");
        return reviews;
    }

    async updateReviewById(id: number, data: Partial<Review>){
        await reviewRepository.update(id, data);
        const updatedReview = await reviewRepository.findOne({ where: {id } });
        if (!updatedReview) throw new Error("Review not found!");
        return updatedReview;
    }

    async deleteReview(id: number){
        // const result = await reviewRepository.delete(id);
        // if (result.affected === 0) throw new Error("Review not found!");
        await reviewRepository.update(id,{deleted:true})
    }

    async getAllReviews(){
        return await reviewRepository.find({ relations:['course','user']});
    }

}
