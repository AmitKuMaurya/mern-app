import {Types} from "mongoose"
export interface IUser {
    name : string;
    email: string;
    password: string;
    phone : number;
    avatar : string;
    dateOfBirth : string,
    confirmPassword: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IVerifyToken {
    id : string | Types.ObjectId;
    email : string;
}