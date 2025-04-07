import { Comment } from "../models/Comment";
import { commentRepository } from "../repositories/commentRepository";

export class CommentService{

    async createComment(commentData: Partial<Comment>){
        const enrollment = commentRepository.create(commentData);
        return await commentRepository.save(enrollment);
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

    async updateCommentById(id: number, data: Partial<Comment>){
    commentRepository.update(id, data);
    const updatedComment = await commentRepository.findOne({ where: {id } });
    if (!updatedComment) throw new Error("Comment not found!");
    return updatedComment;
    }

    async deleteComment(id: number){
    const result = await commentRepository.delete(id);
    if (result.affected === 0) throw new Error("Comment not found!");
    }

    async getAllComments(){
    return await commentRepository.find();
    }
}
