import { Course } from "../models/Course";
import { Lesson } from "../models/Lesson"
import { courseRepository } from "../repositories/courseRepository";
import { lessonRepository } from "../repositories/lessonRepository"

export class LessonService{

    async createlesson(lessonData: {title:string,videoUrl:string,description:string,duration:number,courseId:number}){
        const coursedata = await courseRepository.findOne({where:{id:lessonData.courseId}}) as Course
        const lesson = lessonRepository.create({...lessonData, course:coursedata});
        return await lessonRepository.save(lesson);
    }

    async getLessonById(id:number){
        const lesson= await lessonRepository.findOne({where:{id}})
        if(!lesson) throw new Error("Lesson not found!")
        return lesson
    }

    async getLessonsByCourseId(courseId: number) {


        const lessons = await lessonRepository.find({
          where: { course: { id: courseId } },
          relations: ['course'],
        });
        if (lessons.length === 0) throw new Error("No lessons found for this course!");
        return lessons;
      }
      

      async updateLesson(id: number, data:Partial<Lesson>) {

        const course = await courseRepository.findOne({ where: { id: data.course?.id } }) as Course;
        if (!course) throw new Error("Course not found!");
    
        const updateddata = { ...data, course };
 
        await lessonRepository.update({ id: +id }, { ...updateddata });
    
        const updatedLesson = await lessonRepository.findOne({ where: { id }, relations: ['course'] });
        if (!updatedLesson) throw new Error("Lesson not found!");
    
        return updatedLesson;
    }
    

    async deleteLesson(id:number){
        const result= await lessonRepository.delete(id)
        if(result.affected===0) throw new Error("Lesson not found!")
    }

    async getAllLessons(){
        return await lessonRepository.find({relations:['course']})
    }

}