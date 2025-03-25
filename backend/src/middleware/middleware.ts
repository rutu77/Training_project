import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import { AuthRequest } from "../types/authRequest";
import { error } from "console";
import { Auth } from "typeorm";


// "@types/express": "^5.0.0",
// "@types/mssql": "^9.1.7",
// "@types/node": "^22.13.10",
// "bcrypt": "^5.1.1",
// "express": "^4.21.2",
// "jsonwebtoken": "^9.0.2",
// "mssql": "^11.0.1",
// "nodemon": "^3.1.9",
// "ts-node": "^10.9.2"

const secretKey= "TrainingSecretKey"

interface Decoded{
    email:string;
    iat:number;
    exp:string;
}

export const authenticateUser: RequestHandler= async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    if(
        !req.header("Authorization")||
        !req.header("Authorization")?.startsWith("Bearer")
    ){
        res.status(401).json({error:"Access denied. No token provided"})
        return;
    }

    const token= req.header("Authorization")?.split(" ")[1];
    try{
        const decoded= jwt.verify(token!, secretKey) as JwtPayload & Decoded

        const freshUser= await authService.getUserByEmail(decoded.email);
        // console.log(freshUser);

        (req as AuthRequest).user= freshUser;

        next();
        
    }
    catch(error){
        res.status(401).json({error:"Invalid Token!"})
    }
}