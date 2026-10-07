import { Comment } from "../models/Comment";
import { commentRepository } from "../repositories/commentRepository";
import { userRepository } from "../repositories/userRepository";
import { courseRepository } from "../repositories/courseRepository";

export class CommentService{

    async createComment(commentData: { message: string; courseId: number }, userId: number){
        const [user, course] = await Promise.all([
            userRepository.findOne({ where: { id: userId } }),
            courseRepository.findOne({ where: { id: commentData.courseId } }),
        ]);
        if (!user || !course) throw new Error("User or course not found");
        const comment = commentRepository.create({ message: commentData.message, user, course });
        return commentRepository.save(comment);
    }
      
    
    async getCommentById(id: number){
    const comment = await commentRepository.findOne({ where: {id } });
    if (!comment) throw new Error("Comment not found!");
    return comment;
    }


    async getCommentByCourseId(courseId: number) {
        const comments= await commentRepository.find({
            where: { course: { id: courseId } },
            relations: ['course','user'],
        })
        if (comments.length === 0) throw new Error("No comments found for this course!");
        return comments;
    }


    async updateCommentById(id: number, message: string, userId: number, isAdmin: boolean){
    const comment = await commentRepository.findOne({ where: { id }, relations: ["user"] });
    if (!comment) throw new Error("Comment not found!");
    if (!isAdmin && comment.user.id !== userId) throw new Error("You cannot update this comment");
    comment.message = message;
    return commentRepository.save(comment);
    }


    async deleteComment(id: number, userId: number, isAdmin: boolean){
        const comment = await commentRepository.findOne({ where: { id }, relations: ["user"] });
        if (!comment) throw new Error("Comment not found!");
        if (!isAdmin && comment.user.id !== userId) throw new Error("You cannot delete this comment");
        comment.deleted = true;
        await commentRepository.save(comment);
    }


    async getAllComments(){
    return await commentRepository.find();
    }
}
