import e from "cors";
import { Enrollment } from "../models/Enrollment";
import { enrollRepository } from "../repositories/enrollmentRepository";
import { userRepository } from "../repositories/userRepository";
import { courseRepository } from "../repositories/courseRepository";
const PDFDocument = require("pdfkit");
import fs from "fs";
import path from "path";

interface EnrollmentData {
  userId: number;
  courseId: number;
}

export class EnrollmentService {
  async createEnrollment(enrollmentData: EnrollmentData) {
    const user = await userRepository.findOne({
      where: { id: enrollmentData.userId },
    });
    const course = await courseRepository.findOne({
      where: { id: enrollmentData.courseId },
    });

    if (!user || !course) {
      throw new Error("Invalid user or course ID");
    }
    const enrollment = enrollRepository.create({ user, course });
    return await enrollRepository.save(enrollment);
  }

  async getEnrollmentById(id: number) {
    const enrollment = await enrollRepository.findOne({ where: { id } });
    if (!enrollment) throw new Error("Enrollment not found!");
    return enrollment;
  }

  async updateEnrollmentById(id: number, data: Partial<Enrollment>) {
    await enrollRepository.update(id, data);
    const updatedEnrollment = await enrollRepository.findOne({ where: { id } });
    if (!updatedEnrollment) throw new Error("Enrollment not found!");
    return updatedEnrollment;
  }

  async deleteEnrollment(id: number) {
    // const result = await enrollRepository.delete(id);
    // if (result.affected === 0) throw new Error("Enrollment not found!");
    await enrollRepository.update(id, { deleted: true });
  }

  async getAllEnrollments() {
    return await enrollRepository.find({ relations: ["course", "user"] });
  }

  async getEnrollmentByCourse(courseId: number) {
    const enrollment = await enrollRepository.findOne({
      where: { course: { id: courseId } },
      relations: ["course", "user"],
    });
    if (!enrollment) throw new Error("Enrollment not found!");
    return enrollment;
  }

  async generateEnrollReceipt(courseId: number, userId: number) {
    const enrollment = await this.getEnrollmentByCourse(courseId);
    const user= await userRepository.findOne({where:{id:userId}})

    const reportsDir = path.join(__dirname, "..", "enrollment_receipts");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const filePath = path.join(reportsDir, `Enrollment_Receipt_${userId}.pdf`);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc
      .fontSize(20)
      .text("Enrollment Receipt", { align: "center" })
      .moveDown(2);

    doc
      .fontSize(12)
      .text(`Course Enrolled: ${enrollment.course.title}`, { underline: true })
      .text(`Course duration: ${enrollment.course.duration}`)
      .text(`Course price: ${enrollment.course.price}`)
      .text(
        `Enrolled on: ${new Date(enrollment.enrollment_date).toLocaleString()}`
      )
      .text(`User Details: \n UserId: ${userId} \n User Name: ${user?.name}`)
      .moveDown();

    doc.end();

    return new Promise<string>((resolve, reject) => {
      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    });
  }
}
