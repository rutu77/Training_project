import { AppDataSource } from "../config/database";
import { Lesson } from "../models/Lesson";

export  const lessonRepository=AppDataSource.getRepository(Lesson)

export class LessonRepositoty{

    async getLessonbyId(id:number){
        return lessonRepository.findOne({where:{lesson_id:id}})
    }
    
}