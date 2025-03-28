import { Course } from "../models/Course";
import { courseRepository } from "../repositories/courseRepository";

export class CourseService{

    async getCourseById(id:number){
        const course= await courseRepository.findOne({where:{course_id:id}})
        if(!course) throw new Error("Course not found!")
        return course
    }

    async updateCourse(id:number, data:Partial<Course>){
        await courseRepository.update(id,data)
        const updateCourse= await courseRepository.findOne({where:{course_id:id}})
        if(!updateCourse) throw new Error("Course not found")
        return updateCourse
    }

    async deleteCourse(id:number){
        const result= await courseRepository.delete(id)
        if(result.affected===0) throw new Error("User not found!")
    }

    async getAllCourses(){
        return await courseRepository.find()
    }

}