import express,{ Express, Router } from "express";
import cors from "cors"
import { UserRouter } from "../routers/UserRouter";
import { UserController } from "../controllers/UserController";
import {connect } from "mongoose";
import dotenv from 'dotenv';
import path from "path";
class Application{
    private static app:Express=express();
    
    public static runApp(){
        this.initMiddleware();
        this.initController();
        this.runServer();
    }
    private static initMiddleware():void{
        this.app.use(cors());
        dotenv.config()
        this.app.use('/media',express.static(path.join(path.dirname(__dirname),"media")))
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(express.json())
    }
    private static initController():void{
        UserController.init(this.app);
    }

    private static runServer(){
        const PORT=process.env.PORT||8000;
        connect("mongodb://127.0.0.1:27017/maiflix").then(e=>{
            console.log("Connected to database");
        }).catch(err=>console.error(err))
        this.app.listen(PORT,()=>{
            console.log(`Server running in port ${PORT}...`)
        });
    }
}

export default Application;