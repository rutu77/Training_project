import { Attempt } from "../models/Attempt";
import { attemptRepository } from "../repositories/attemptRepository";

export class AttemptService{

    async createAttempt(AttemptData: Partial<Attempt>){
        const attempt = attemptRepository.create(AttemptData);
        return await attemptRepository.save(attempt);
    }
      
    
    async getAttemptById(id: number){
        const Attempt = await attemptRepository.findOne({ where: { attempt_id: id } });
        if (!Attempt) throw new Error("Attempt not found!");
        return Attempt;
    }

    async updateAttemptById(id: number, data: Partial<Attempt>){
        await attemptRepository.update(id, data);
        const updatedAttempt = await attemptRepository.findOne({ where: { attempt_id: id } });
        if (!updatedAttempt) throw new Error("Attempt not found!");
        return updatedAttempt;
    }

    async deleteAttempt(id: number){
        const result = await attemptRepository.delete(id);
        if (result.affected === 0) throw new Error("Attempt not found!");
    }

    async getAllAttempts(){
        return await attemptRepository.find();
    }
}
