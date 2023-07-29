import { Router,Response, Request } from "express";

export class MediaRouter{
	private router:Router=Router();
	public static getInstance = (): MediaRouter => new MediaRouter();
	private getMedia(){
		this.router.get("/media",(req:Request,res:Response)=>{
			const email=req.body.email;
			if(email!==null&&email!==""&&email){
				
			}
		})
	}
}