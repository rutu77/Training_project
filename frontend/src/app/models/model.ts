export interface User{
    id:number
    name:string
    email:string
    password:string
    role:'user'|'admin'|'teacher'
    profilePicture?:string
    bio?:string
}

export interface Course{
    id:number
    title:string
    description:string
    isPublished:boolean
    thumbnail?:string
    price:number
    // tags?:string[],
    creatorId:number,
    level:string,
    duration:number
}

export interface AddCourse{
    title:string,
    description:string,
    isPublished:boolean,
    thumbnail:string,
    price:number,
    // tags:string[],
    creatorId:number,
    level:string,
    duration:number
}

export interface UpdateCourse {
    title?: string;
    description?: string;
    isPublished?: boolean;
    thumbnail?: string;
    price?: number;
    // tags?: string[];
    level?: string;
    duration?: number;
  }
  

export interface Enrollment{
    enrollment_id:number,
    enrollment_date:Date,
    user:User,
    course:Course
    status: "in_progress"|"completed"; 
}

export interface Lesson{
    id:number
    title:string
    videoUrl:string
    duration?:number
    courseId:number
}

export interface Quiz{
    quiz_id:number,
    question:string,
    options:string[],
    correctAnswer:string,
    explanation?:string
}

export interface Category{
    category_id:number,
    name:string,
    description?:true,
}

export interface Review{
    review_id:number,
    user:User,
    course:Course
    rating:number,
    comment?:string

}

export interface Comment{
    comment_id:number,
    message:string,
}

export interface Progress{
    progress_id:number,
    isCompleted:boolean
}

export interface Attempt{
    attempt_id:number,
    selectedAnswer:string,
    isCorrect:boolean
}