import { Course } from "../models/Course";
import { User } from "../models/User";
import { courseRepository } from "../repositories/courseRepository";

export class CourseService{
    async createCourse(
        courseData: {
            title: string;
            description: string;
            isPublished: boolean;
            thumbnail: string;
            price: number;
            level: 'beginner' | 'intermediate' | 'advanced';
            duration: number;
        },
        creator: User
    ){
        const course = courseRepository.create({...courseData, creator});
        return await courseRepository.save(course);
    }


    async getPublicCourseById(id:number){
        const course= await courseRepository.findOne({
            where:{id, isPublished:true, deleted:false},
        })
        if(!course) throw new Error("Course not found!")
        return course
    }

    async getManageCourseById(id:number, user:User){
        const course= await courseRepository.findOne({
            where: user.role === "admin"
                ? { id, deleted:false }
                : { id, creator:{ id:user.id }, deleted:false },
            relations:["creator"],
        })
        if(!course) throw new Error("Course not found!")
        return course
    }

    async updateCourse(id:number, data:Partial<Course>){
        // console.log(data);
        data = {...data,id:undefined}
        await courseRepository.update({id:+id},{...data})
        
        const updateCourse= await courseRepository.findOne({where:{id:+id}})
        if(!updateCourse) throw new Error("Course not found")
        return updateCourse
    }

    async deleteCourse(id:number){
        await courseRepository.update(id,{deleted:true})
        // const result = await courseRepository.delete(id);
        // if(result.affected===0) throw new Error("Course not found!")
    }

    async deleteTheCourse(id:number){
        const result = await courseRepository.delete(id);
        if(result.affected===0) throw new Error("Course not found!")
    }

    async getPublicCourses(query: { page: number; limit: number; search: string }) {
        const builder = courseRepository.createQueryBuilder("course")
            .leftJoinAndSelect("course.creator", "creator")
            .where("course.isPublished = :isPublished", { isPublished: true })
            .andWhere("course.deleted = :deleted", { deleted: false });
        if (query.search) {
            builder.andWhere(
                "(course.title ILIKE :search OR course.description ILIKE :search)",
                { search: `%${query.search}%` }
            );
        }

        const [data, total] = await builder
            .orderBy("course.createdAt", "DESC")
            .skip((query.page - 1) * query.limit)
            .take(query.limit)
            .getManyAndCount();

        return {
            data,
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages: Math.ceil(total / query.limit),
            },
        };
    }

    async getManageCourses(user:User){
        return await courseRepository.find({
            where: user.role === "admin"
                ? { deleted:false }
                : { creator:{ id:user.id }, deleted:false },
            relations:["creator"],
        })
    }

    // async searchCourses(search:string){
    //     return await courseRepository.createQueryBuilder('course')
    //     .where('course.title LIKE :search OR course.description LIKE :search',{search:`%${search}`})
    //     .getMany()
    // }

}