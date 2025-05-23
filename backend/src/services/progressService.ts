import { resolve } from "path";
import { Progress } from "../models/Progress";
import { Quiz } from "../models/Quiz";
import { User } from "../models/User";
import { progressRepository } from "../repositories/progressRepository";
import { quizRepository } from "../repositories/quizRepository";
import { userRepository } from "../repositories/userRepository";
import { rejects } from "assert";
const PDFDocument = require('pdfkit')
import fs from 'fs';
import path from 'path';
import { lessonRepository } from "../repositories/lessonRepository";
import { Lesson } from "../models/Lesson";


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

  async getProgressByUser(userId:number){
  const progress= await progressRepository.find({where:{user:{id:userId}},relations:['user','quiz'],order: { completion: 'DESC' }});
  return progress
  }

  async getAllprogresss(){
    return await progressRepository.find({relations:['user','quiz']})
  }

  async deleteProgress(id: number) {
    const result = await progressRepository.delete(id);
    if (result.affected === 0) throw new Error("Progress not found!");
  }

  async generateProgressReport(userId:number){
    const progressList: Progress[] = await this.getProgressByUser(userId);
    // console.log('generate',progressList);
    
  
    const reportsDir = path.join(__dirname, '..', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
  
    const filePath = path.join(reportsDir, `quiz_progress_report_${userId}.pdf`);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
  
    doc.fontSize(20).text('Quiz Progress Report', { align: 'center' }).moveDown(2);
  
    progressList.forEach((progress, index) => {
      doc.fontSize(12)
        .text(`${index + 1}. Quiz: ${progress.quiz.title}`, { underline: true })
        .text(`   Score: ${progress.score}`)
        .text(`   Completed on: ${new Date(progress.completion).toLocaleString()}`)
        .moveDown();
    });

    doc.end();
  
    return new Promise<string>((resolve, reject) => {
      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    });
  };


  async updateProgress(id: number, data:Partial<Progress>) {
      const lesson = await lessonRepository.findOne({ where: { course: { id: +id } },relations: ['course','progress'],}) as Lesson;

      await progressRepository.update({ id: +lesson.id }, data);

      const updatedProgress = await progressRepository.findOne({ where: { id }, relations: ['course','lesson','user'] });
      if (!updatedProgress) throw new Error("Progress not found!");
  
      return updatedProgress;
  }

}