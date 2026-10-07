import { Course } from "../models/Course";
import { User } from "../models/User";
import { courseRepository } from "../repositories/courseRepository";

export class CourseService{
    async createCourse(
        courseData: {
            title: string;
            description: string;
            isPublished: boolean;
            thumbnail: string;
            price: number;
            level: 'beginner' | 'intermediate' | 'advanced';
            duration: number;
        },
        creator: User
    ){
        const course = courseRepository.create({...courseData, creator});
        return await courseRepository.save(course);
    }


    async getCourseById(id:number){
        const course= await courseRepository.findOne({where:{id}})
        if(!course) throw new Error("Course not found!")
        return course
    }

    async updateCourse(id:number, data:Partial<Course>){
        // console.log(data);
        data = {...data,id:undefined}
        await courseRepository.update({id:+id},{...data})
        
        const updateCourse= await courseRepository.findOne({where:{id:+id}})
        if(!updateCourse) throw new Error("Course not found")
        return updateCourse
    }

    async deleteCourse(id:number){
        await courseRepository.update(id,{deleted:true})
        // const result = await courseRepository.delete(id);
        // if(result.affected===0) throw new Error("Course not found!")
    }

    async deleteTheCourse(id:number){
        const result = await courseRepository.delete(id);
        if(result.affected===0) throw new Error("Course not found!")
    }

    async getAllCourses(){
        return await courseRepository.find()
    }

    // async searchCourses(search:string){
    //     return await courseRepository.createQueryBuilder('course')
    //     .where('course.title LIKE :search OR course.description LIKE :search',{search:`%${search}`})
    //     .getMany()
    // }

}