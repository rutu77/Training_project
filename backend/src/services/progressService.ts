import { Progress } from "../models/Progress";
import { progressRepository } from "../repositories/progressRepository";
const PDFDocument = require('pdfkit')
import fs from 'fs';
import path from 'path';


export class ProgressService{

  async getprogressById(id:number){
    const progress= await progressRepository.findOne({where:{id}, relations:['quiz', 'user'], order:{completion:'DESC'}})
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


}