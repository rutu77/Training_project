export interface User{
    id:number
    name:string
    email:string
    password:string
    role:'user'|'admin'|'teacher'
    profilePicture?:string
    bio?:string
    deleted:boolean
}

export interface Course{
    id:number
    title:string
    description:string
    isPublished:boolean
    thumbnail?:string
    price:number
    // tags?:string[],
    creator:User,
    level:string,
    duration:number
    deleted:boolean
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
    deleted:boolean
}

export interface Lesson{
    id:number
    title:string
    videoUrl:string
    duration?:number
    course:Course
    deleted:boolean
}

export interface Quiz{
    id?:number,
    courseId:number,
    questions:Question[]
    deleted:boolean
}

export interface Question{
    id?:number
    question:string,
    options:string[],
    correctAnswer:string,
    explanation?:string
    deleted:boolean
}

// export interface Category{
//     category_id:number,
//     name:string,
//     description?:true,
// }

export interface Review{
    id:number,
    user:User,
    course:Course
    rating:number,
    comment:string
    deleted:boolean
}

export interface AddReview{
    userId:number,
    courseId:number,
    rating:number,
    comment:string
}

export interface UpdateReview{
    rating?:number,
    comment?:string
}


export interface Progress{
    id:number,
    score:number
    total:number
    completion:string
    user:User
    quiz:Quiz
    deleted:boolean
}


