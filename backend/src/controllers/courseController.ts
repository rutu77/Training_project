import { Request ,Response} from "express";
import { CourseService } from "../services/courseService";


export class CourseController{
    courseService= new CourseService()

    async getCourseById(req:Request,res:Response){
        const courseId = Number(req.params.id);
        try {
          const course = await this.courseService.getCourseById(courseId);
          res.status(200).json({data:course});
        } catch (error) {
          res.status(404).json({ message: (error as Error).message });
        }
    }
    
    async updateCourse(req: Request, res:Response){
       const courseId = Number(req.params.id);
        const data = req.body;
        try{
          const updatedCourse=await this.courseService.updateCourse(courseId,data);
          res.status(200).json({message:"Course updated successfully",data:updatedCourse});
        } catch(error){
          res.status(404).json({message:(error as Error).message});
        }
    }
    
    async deleteCourse(req:Request,res:Response){
        const courseId=Number(req.params.id);
        try{
          await this.courseService.deleteCourse(courseId);
          res.status(200).json({ message:"Course deleted successfully!" });
        } catch(error){
          res.status(404).json({ message:(error as Error).message });
        }
    }
    
    async getAllCourses(req:Request,res:Response){
        try{
          const courses=await this.courseService.getAllCourses();
          res.status(200).json(courses);
        }catch(error){
          res.status(500).json({error:"Error fetching courses" });
        }
    }
}