import { Request ,Response} from "express";
import { CourseService } from "../services/courseService";
import { Course } from "../models/Course";

const courseService= new CourseService()

export class CourseController{

    async createCourse(req: Request, res: Response){
      console.log(req.body);
      const { title, description, isPublished, thumbnail, price, tags, creatorId, level, duration }  = req.body;
      try {
        const course = await courseService.createCourse({ title, description, isPublished, thumbnail, price, tags, creatorId, level, duration } );
        res.status(201).json({ message: "Course created successfully!", data: course });
      } catch (error) {
        res.status(500).json({ error: "Error creating enrollment" });
      }
    }

    async getCourseById(req:Request,res:Response){
        const courseId = Number(req.params.id);
        try {
          const course = await courseService.getCourseById(courseId);
          res.status(200).json({data:course});
        } catch (error) {
          res.status(404).json({ message: (error as Error).message });
        }
    }
    
    async updateCourse(req: Request, res:Response){
       const courseId = Number(req.params.id);
        console.log(courseId);
        const data = req.body;
        console.log(data);
        try{
          const updatedCourse=await courseService.updateCourse(courseId,data);
          res.status(200).json({message:"Course updated successfully",data:updatedCourse});
        } catch(error){
          res.status(404).json({message:(error as Error).message});
        }
    }
    
    async deleteCourse(req:Request,res:Response){
        const courseId=Number(req.params.id);
        try{
          await courseService.deleteCourse(courseId);
          res.status(204).json({ message:"Course deleted successfully!" });
        } catch(error){
          res.status(404).json({ message:(error as Error).message });
        }
    }
    
    async getAllCourses(req:Request,res:Response){
        try{
          const courses=await courseService.getAllCourses();
          res.status(200).json(courses);
        }catch(error){
          res.status(500).json({error:"Error fetching courses" });
        }
    }
}