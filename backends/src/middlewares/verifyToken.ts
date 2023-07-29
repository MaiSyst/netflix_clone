import { NextFunction,Request,Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken=(req:any,res:Response,next:NextFunction)=>{
    const authorized:string|null|undefined = req.headers["authorization"];
	const token=authorized&&authorized.split(" ")[1];
    
    let SECRET_TOKEN=process.env.SECRET_TOKEN;
    verify(`${token}`,`${SECRET_TOKEN}`,(err,result)=>{
        if(err) res.status(403).json({"message":"Token isn't valid"})
        req.user=result;
        next();
    })
    
    
}