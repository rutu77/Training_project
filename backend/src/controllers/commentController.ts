import { Request, Response } from "express";
import { CommentService } from "../services/commentService";
import { AuthRequest } from "../types/authRequest";

const commentService = new CommentService();

export class CommentController {

  async createComment(req: Request, res: Response){
    const user = (req as AuthRequest).user;
    const courseId = Number(req.body.courseId);
    const { message } = req.body;
    if (!user || !Number.isInteger(courseId) || courseId <= 0 ||
        typeof message !== "string" || !message.trim()) {
      res.status(400).json({ message: "A valid course ID and comment message are required" });
      return;
    }
    try {
      const comment = await commentService.createComment({ courseId, message: message.trim() }, user.id);
      res.status(201).json({ message: "comment created successfully!", data: comment });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
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
      const user = (req as AuthRequest).user;
      const { message } = req.body;
      if (!user || typeof message !== "string" || !message.trim()) {
        res.status(400).json({ message: "A comment message is required" });
        return;
      }
      const commentId = Number(req.params.id);
      try {
        const updatedComment = await commentService.updateCommentById(commentId, message.trim(), user.id, user.role === "admin");
        res.status(200).json({message:"Comment updated successfully", data: updatedComment });
      } catch (error) {
        res.status((error as Error).message.includes("cannot") ? 403 : 404).json({ message: (error as Error).message });
      }
    }
  
    async deleteComment(req: Request, res: Response): Promise<void> {
      const user = (req as AuthRequest).user;
      if (!user) {
        res.status(401).json({ message: "Authentication is required" });
        return;
      }
      const commentId = Number(req.params.id);
      try {
        await commentService.deleteComment(commentId, user.id, user.role === "admin");
        res.status(200).json({ message: "Comment deleted successfully!" });
      } catch (error) {
        res.status((error as Error).message.includes("cannot") ? 403 : 404).json({ message: (error as Error).message });
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