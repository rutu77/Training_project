import { Request } from "express";

export interface AuthRequest extends Request{
    user?:any;
}

//  In many applications, especially those involving authentication, you might want to attach additional 
//  information to the request object. For example, after a user logs in, you might attach the user's 
//  information to the request object so that it can be accessed in subsequent middleware or route handlers.