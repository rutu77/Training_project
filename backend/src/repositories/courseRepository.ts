import { AppDataSource } from "../config/database";
import { Course } from "../models/Course";

export const courseRepo=AppDataSource.getRepository(Course)
export class CourseRepository{

    async getCourseById(course_id:number){
        return courseRepo.findOne({where:{course_id}})
    }
    
}