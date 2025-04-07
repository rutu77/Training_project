import { Request, Response } from "express";
import { CommentService } from "../services/commentService";

const commentService = new CommentService();

export class CommentController {

  async createComment(req: Request, res: Response){
    const commentData = req.body;
    try {
      const comment = await commentService.createComment(commentData);
      res.status(201).json({ message: "comment created successfully!", data: comment });
    } catch (error) {
      // res.status(500).json({ error: "Error creating comment" });
      res.status(500).json({ error: (error as Error).message  });

    }
  }  

    async getCommentById(req: Request, res: Response): Promise<void> {
      const commentId = Number(req.params.id);
      try {
        const comment = await commentService.getCommentById(commentId);
        res.status(200).json({ data: comment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }

    async getCommentyCourseId(req:Request, res:Response){
      const courseId= Number(req.params.id)
      try{
          const comment= await commentService.getCommentByCourseId(courseId)
          res.status(200).json({data:comment})
      }
      catch(error){
          res.status(404).json({message:(error as Error).message})
      }
  }
    
  
    async updateComment(req: Request, res: Response): Promise<void> {
      const commentId = Number(req.params.id);
      const data = req.body;
      try {
        const updatedComment = await commentService.updateCommentById(commentId, data);
        res.status(200).json({message:"Comment updated successfully", data: updatedComment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async deleteComment(req: Request, res: Response): Promise<void> {
      const commentId = Number(req.params.id);
      try {
        await commentService.deleteComment(commentId);
        res.status(200).json({ message: "Comment deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async getAllComments(req: Request, res: Response): Promise<void> {
      try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
      } catch (error) {
        res.status(500).json({ error: "Error fetching comments" });
      }
    }
}