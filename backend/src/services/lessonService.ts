import { Lesson } from "../models/Lesson"
import { lessonRepository } from "../repositories/lessonRepository"

export class LessonService{

    async createlesson(lessonData: Partial<Lesson>){
        const lesson = lessonRepository.create(lessonData);
        return await lessonRepository.save(lesson);
    }

    async getLessonById(id:number){
        const lesson= await lessonRepository.findOne({where:{id}})
        if(!lesson) throw new Error("Lesson not found!")
        return lesson
    }

    async updateLesson(id:number,data:Partial<Lesson>){
        await lessonRepository.update(id,data)
        const updatedLesson= await lessonRepository.findOne({where:{id}})
        if(!updatedLesson) throw new Error("Lesson not found!")
        return updatedLesson
    }

    async deleteLesson(id:number){
        const result= await lessonRepository.delete(id)
        if(result.affected===0) throw new Error("Lesson not found!")
    }

    async getAllLessons(){
        return await lessonRepository.find()
    }

}