import { Router } from "express";

export abstract class MainRouter {
    protected router:Router=Router();
    protected abstract add():void;
    protected abstract edit():void;
    protected abstract remove():void;
    protected abstract fetchById():void;
    protected abstract fetchAll():void;
    public getRouter=()=>this.router
}
