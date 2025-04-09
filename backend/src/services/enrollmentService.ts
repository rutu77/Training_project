import e from "cors";
import { Enrollment } from "../models/Enrollment";
import { enrollRepository } from "../repositories/enrollmentRepository";
import { userRepository } from "../repositories/userRepository";
import { courseRepository } from "../repositories/courseRepository";

interface EnrollmentData {
  userId: number;
  courseId: number;
}

export class EnrollmentService {

    // async createEnrollment(enrollmentData: Partial<EnrollmentData>) {
    //   const enrollment = enrollRepository.create(enrollmentData);
    //   console.log(enrollmentData,enrollment);
    //   return await enrollRepository.save(enrollment);
    // }

    async createEnrollment(enrollmentData: EnrollmentData) {
      const user = await userRepository.findOne({where:{id:enrollmentData.userId}});
      const course = await courseRepository.findOne({where:{id:enrollmentData.courseId}});

      if (!user || !course) {
        throw new Error("Invalid user or course ID");
      }
      const enrollment = enrollRepository.create({user,course,});
      return await enrollRepository.save(enrollment);
    }
  
    async getEnrollmentById(id: number){
      const enrollment = await enrollRepository.findOne({ where: {id }});
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
      // const result = await enrollRepository.delete(id);
      // if (result.affected === 0) throw new Error("Enrollment not found!");
      await enrollRepository.update(id,{deleted:true})
    }
  
    async getAllEnrollments(){
      return await enrollRepository.find({ relations:['course','user'] });
    }
  }