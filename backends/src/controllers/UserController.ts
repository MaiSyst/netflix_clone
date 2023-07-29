import { Application } from "express";
import { UserRouter } from "../routers/UserRouter";

export class UserController{
    public static init(app:Application){
        app.use("/api",UserRouter.getInstance().getRouter())
    }
}