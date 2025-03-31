import { Progress } from "../models/Progress";
import { progressRepository } from "../repositories/progressRepository";

export class ProgressService{

    async createprogress(progressData: Partial<Progress>){
        const progress = progressRepository.create(progressData);
        return await progressRepository.save(progress);
    }

    async getprogressById(id:number){
        const progress= await progressRepository.findOne({where:{id}})
        if(!progress) throw new Error("progress not found!")
        return progress
    }

    async updateprogress(id:number,data:Partial<Progress>){
        await progressRepository.update(id,data)
        const updatedprogress= await progressRepository.findOne({where:{id}})
        if(!updatedprogress) throw new Error("progress not found!")
        return updatedprogress
    }

    async deleteprogress(id:number){
        const result= await progressRepository.delete(id)
        if(result.affected===0) throw new Error("progress not found!")
    }

    async getAllprogresss(){
        return await progressRepository.find()
    }

}