import { Request, Response } from "express";
import { CommentService } from "../services/commentService";

export class CommentController {
    commentService = new CommentService();

    async getCommentById(req: Request, res: Response): Promise<void> {
      const commentId = Number(req.params.id);
      try {
        const comment = await this.commentService.getCommentById(commentId);
        res.status(200).json({ data: comment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async updateComment(req: Request, res: Response): Promise<void> {
      const commentId = Number(req.params.id);
      const data = req.body;
      try {
        const updatedComment = await this.commentService.updateCommentById(commentId, data);
        res.status(200).json({message:"Comment updated successfully", data: updatedComment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async deleteComment(req: Request, res: Response): Promise<void> {
      const commentId = Number(req.params.id);
      try {
        await this.commentService.deleteComment(commentId);
        res.status(200).json({ message: "Comment deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async getAllComments(req: Request, res: Response): Promise<void> {
      try {
        const comments = await this.commentService.getAllComments();
        res.status(200).json(comments);
      } catch (error) {
        res.status(500).json({ error: "Error fetching comments" });
      }
    }
  }