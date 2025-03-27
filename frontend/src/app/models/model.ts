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
    course_id:number
    title:string
    description:string
    isPublished:boolean
    thumbnail?:string
    price:number
    tags?:string[]
}

export interface Enrollment{
    enrollment_id:number
}

export interface Lesson{
    lesson_id:number
    title:string
    videoUrl:string
    duration?:number
    position:number
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
    ratring:number,
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