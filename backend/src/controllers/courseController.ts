import { Request, Response } from "express";
import { CourseService } from "../services/courseService";
import { AuthRequest } from "../types/authRequest";
import { env } from "../config/env";
import { parseCourseCatalogQuery } from "../utils/courseCatalogQuery";
import { Course } from "../models/Course";

const courseService = new CourseService();

function courseResponse(course: Course) {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail,
    level: course.level,
    duration: course.duration,
    price: course.price,
    isPublished: course.isPublished,
    createdAt: course.createdAt,
    deleted: course.deleted,
    creator: course.creator
      ? { id: course.creator.id, name: course.creator.name }
      : null,
  };
}

export class CourseController {
  async createCourse(req: Request, res: Response) {
    const creator = (req as AuthRequest).user;
    if (!creator) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }

    let courseData: {
      title: string;
      description: string;
      isPublished: boolean;
      thumbnail: string;
      price: number;
      level: "beginner" | "intermediate" | "advanced";
      duration: number;
    };

    try {
      const { title, description, price, level, duration } = req.body;

      if (typeof title !== "string" || !title.trim()) {
        throw new Error("Course title is required");
      }
      if (typeof description !== "string" || !description.trim()) {
        throw new Error("Course description is required");
      }

      const parseNonNegativeNumber = (value: unknown, field: string): number => {
        if (
          (typeof value !== "string" && typeof value !== "number") ||
          String(value).trim() === ""
        ) {
          throw new Error(`${field} must be a non-negative number`);
        }
        const parsed = Number(value);
        if (!Number.isFinite(parsed) || parsed < 0) {
          throw new Error(`${field} must be a non-negative number`);
        }
        return parsed;
      };

      const parsedPrice = parseNonNegativeNumber(price, "Course price");
      const parsedDuration = parseNonNegativeNumber(duration, "Course duration");

      if (!Number.isInteger(parsedDuration) || parsedDuration < 0) {
        throw new Error("Course duration must be a non-negative integer");
      }
      if (!["beginner", "intermediate", "advanced"].includes(level)) {
        throw new Error("Course level is invalid");
      }

      const publishedValue = req.body.isPublished;
      const isPublished =
        publishedValue === true ||
        publishedValue === "true";
      if (
        publishedValue !== undefined &&
        publishedValue !== null &&
        publishedValue !== "null" &&
        publishedValue !== "" &&
        publishedValue !== true &&
        publishedValue !== false &&
        publishedValue !== "true" &&
        publishedValue !== "false"
      ) {
        throw new Error("isPublished must be true or false");
      }

      courseData = {
        title: title.trim(),
        description: description.trim(),
        isPublished,
        thumbnail: req.file
          ? `${env.publicApiUrl}/uploads/${req.file.filename}`
          : "",
        price: parsedPrice,
        level,
        duration: parsedDuration,
      };
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
      return;
    }

    try {
      const course = await courseService.createCourse(courseData, creator);
      res
        .status(201)
        .json({ message: "Course created successfully!", data: courseResponse(course) });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  }

  async getCourseById(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    try {
      const course = await courseService.getPublicCourseById(courseId);
      res.status(200).json({ data: courseResponse(course) });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getManageCourseById(req: Request, res: Response) {
    const user = (req as AuthRequest).user;
    if (!user) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }
    try {
      const course = await courseService.getManageCourseById(Number(req.params.id), user);
      res.status(200).json({ data: courseResponse(course) });
    } catch (error) {
      const message = (error as Error).message;
      res.status(message === "Course not found!" ? 404 : 500).json({ message });
    }
  }

  async updateCourse(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    const { title, description, price, level, duration, isPublished, thumbnail } = req.body;
    const data = { title, description, price, level, duration, isPublished, thumbnail };
    try {
      const updatedCourse = await courseService.updateCourse(courseId, data);
      res
        .status(200)
        .json({ message: "Course updated successfully", data: courseResponse(updatedCourse) });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async deleteCourse(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    try {
      await courseService.deleteCourse(courseId);
      res.status(204).json({ message: "Course deleted successfully!" });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async deleteTheCourse(req: Request, res: Response) {
    const courseId = Number(req.params.id);
    try {
      await courseService.deleteTheCourse(courseId);
      res.status(204).json({ message: "Course deleted successfully!" });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getAllCourses(req: Request, res: Response) {
    let query: ReturnType<typeof parseCourseCatalogQuery>;
    try {
      query = parseCourseCatalogQuery(req.query);
    } catch (error) {
      res.status(400).json({ status: "error", message: (error as Error).message });
      return;
    }
    try {
      const result = await courseService.getPublicCourses(query);
      res.status(200).json({
        data: result.data.map(courseResponse),
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Error fetching public courses:", error);
      res.status(500).json({ error: "Error fetching courses" });
    }
  }

  async getManageCourses(req: Request, res: Response) {
    const user = (req as AuthRequest).user;
    if (!user) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }
    try {
      const courses = await courseService.getManageCourses(user);
      res.status(200).json(courses.map(courseResponse));
    } catch (error) {
      console.error("Error fetching courses for management:", error);
      res.status(500).json({ error: "Error fetching courses" });
    }
  }
  // async getSearchCourses(req:Request,res:Response){
  //   try{
  //     const search= req.query.search as string ;
  //     if(!search){
  //       res.status(400).json({error:"search query required"})
  //       return;
  //     }
  //     const courses = await courseService.searchCourses(search);
  //     res.status(200).json(courses)
  //   }catch(error){
  //     res.status(500).json({error:"Error searching courses" });
  //   }

  // }
}
