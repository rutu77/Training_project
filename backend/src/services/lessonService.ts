import { Course } from "../models/Course";
import { Lesson } from "../models/Lesson"
import { courseRepository } from "../repositories/courseRepository";
import { lessonRepository } from "../repositories/lessonRepository"

export class LessonService{

    async createlesson(lessonData: {title:string,videoUrl:string,description:string,duration:number,courseId:number,userId:number}){
        const coursedata = await courseRepository.findOne({where:{id:lessonData.courseId}}) as Course
        // console.log("courseId and userId",coursedata,lessonData.courseId);
        
        if(coursedata.creator.id==lessonData.userId){
            const lesson = lessonRepository.create({...lessonData, course:coursedata});
            return await lessonRepository.save(lesson);
        }
        else{
            throw new Error("You can only add lessons to the courses created by you!")
        }

    }

    async getLessonById(id:number){
        const lesson= await lessonRepository.findOne({where:{id}})
        if(!lesson) throw new Error("Lesson not found!")
        return lesson
    }

    async getLessonsByCourseId(courseId: number) {
        const lessons = await lessonRepository.find({ where: { course: { id: courseId } },relations: ['course'],});
        if (lessons.length === 0) throw new Error("No lessons found for this course!");
        return lessons;
      }
      

    async updateLesson(id: number, data:Partial<Lesson>) {
        await lessonRepository.update({ id: +id }, data);

        const updatedLesson = await lessonRepository.findOne({ where: { id }, relations: ['course'] });
        if (!updatedLesson) throw new Error("Lesson not found!");
    
        return updatedLesson;
    }
    

    async deleteLesson(id:number){
        await lessonRepository.update(id,{deleted:true})
    }


    async getAllLessons(){
        return await lessonRepository.find()
    }

}