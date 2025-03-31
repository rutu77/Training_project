import { Enrollment } from "../models/Enrollment";
import { enrollRepository } from "../repositories/enrollmentRepository";

export class EnrollmentService {

    async createEnrollment(enrollmentData: Partial<Enrollment>){
      const enrollment = enrollRepository.create(enrollmentData);
      return await enrollRepository.save(enrollment);
    }
  
    async getEnrollmentById(id: number){
      const enrollment = await enrollRepository.findOne({ where: {id } });
      if (!enrollment) throw new Error("Enrollment not found!");
      return enrollment;
    }
  
    async updateEnrollmentById(id: number, data: Partial<Enrollment>){
      await enrollRepository.update(id, data);
      const updatedEnrollment = await enrollRepository.findOne({ where: {id } });
      if (!updatedEnrollment) throw new Error("Enrollment not found!");
      return updatedEnrollment;
    }
  
    async deleteEnrollment(id: number){
      const result = await enrollRepository.delete(id);
      if (result.affected === 0) throw new Error("Enrollment not found!");
    }
  
    async getAllEnrollments(){
      return await enrollRepository.find();
    }
  }