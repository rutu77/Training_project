import { Enrollment } from "../models/Enrollment";
import { enrollRepository } from "../repositories/enrollmentRepository";
import { userRepository } from "../repositories/userRepository";
import { courseRepository } from "../repositories/courseRepository";
import { User } from "../models/User";
const PDFDocument = require("pdfkit");
import fs from "fs";
import path from "path";

export class EnrollmentService {
  async createEnrollment(userId: number, courseId: number) {
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    const course = await courseRepository.findOne({
      where: { id: courseId },
    });

    if (!user || !course) {
      throw new Error("Invalid user or course ID");
    }
    const existing = await enrollRepository.findOne({ where: { user: { id: userId }, course: { id: courseId } } });
    if (existing) throw new Error("Already enrolled in this course");
    const enrollment = enrollRepository.create({ user, course });
    return await enrollRepository.save(enrollment);
  }

  async getEnrollmentById(id: number) {
    const enrollment = await enrollRepository.findOne({ where: { id } });
    if (!enrollment) throw new Error("Enrollment not found!");
    return enrollment;
  }

  async updateEnrollmentById(id: number, data: Partial<Enrollment>) {
    const status = data.status;
    if (status !== "in_progress" && status !== "completed") {
      throw new Error("Invalid enrollment status");
    }
    await enrollRepository.update(id, { status });
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

  async getManageEnrollments(user: User) {
    const query = enrollRepository
      .createQueryBuilder("enrollment")
      .leftJoinAndSelect("enrollment.user", "student")
      .leftJoinAndSelect("enrollment.course", "course")
      .leftJoin("course.creator", "creator")
      .where("enrollment.deleted = false")
      .orderBy("enrollment.enrollment_date", "DESC");

    if (user.role !== "admin") {
      query.andWhere("creator.id = :teacherId", { teacherId: user.id });
    }

    return query.getMany();
  }

  async getEnrollmentsByUser(userId: number) {
    return await enrollRepository.find({
      where: { user: { id: userId } },
      relations: ["course", "user"],
    });
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
    const enrollment = await enrollRepository.findOne({
      where: { course: { id: courseId }, user: { id: userId } },
      relations: ["course", "user"],
    });
    if (!enrollment) throw new Error("Enrollment not found!");
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
