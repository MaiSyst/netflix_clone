import {Schema, model,Types} from "mongoose";
import { IMovies } from "./Movies";
export interface IUser{
    _id:Types.ObjectId,
    username:string,
    email:string,
    password:string,
    profilPic:string,
    isAdmin:boolean,
    confirm:boolean,
    confirmCode:number,
    abonnement:string,
    favorites: Array<IMovies>
}
const userSchema=new Schema<IUser>({
    username: { type: String, required: true,unique:true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    profilPic: { type: String, default:""},
    isAdmin: { type: Boolean, required: true,default:false },
    abonnement:{type:String,},
    confirm:{type:Boolean ,default:false},
    confirmCode:{type:Number,default:0},
    favorites:{type:new Array<IMovies>(),default:[]}
},{timestamps:true});

export const User = model<IUser>('User', userSchema);