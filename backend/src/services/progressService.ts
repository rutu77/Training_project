import { Progress } from "../models/Progress";
import { Quiz } from "../models/Quiz";
import { User } from "../models/User";
import { progressRepository } from "../repositories/progressRepository";

export class ProgressService{

    async createProgress(progressData: { userId: number; quizId: number; score: number; total: number }) {
        const { userId, quizId, score, total } = progressData;
      
        const progress = progressRepository.create({
          user: { id: userId } as User,
          quiz: { id: quizId } as Quiz,
          score,
          total,
        });
      
        return await progressRepository.save(progress);
      }
      

    async getprogressById(id:number){
        const progress= await progressRepository.findOne({where:{id}, relations:['quiz'], order:{completion:'DESC'}})
        if(!progress) throw new Error("progress not found!")
        return progress
    }

    // async updateprogress(id:number,data:Partial<Progress>){
    //     await progressRepository.update(id,data)
    //     const updatedprogress= await progressRepository.findOne({where:{id}})
    //     if(!updatedprogress) throw new Error("progress not found!")
    //     return updatedprogress
    // }

    // async deleteprogress(id:number){
    //     const result= await progressRepository.delete(id)
    //     if(result.affected===0) throw new Error("progress not found!")
    // }

    // async getAllprogresss(){
    //     return await progressRepository.find()
    // }



}