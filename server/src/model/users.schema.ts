import { Schema, model } from "mongoose";
import { IAvatar } from "../interface/user.interface";

// name,email, password, confirmPassword, phone, dateOfBirth,avatar

interface IUser {
    name : string;
    email: string;
    password: string;
    phone : number;
    // avatar : string;
    dateOfBirth : string,
    confirmPassword: string;
}

const UserSchema = new Schema({
    name : {type : String, require : true},
    email: { type: String, require: true },
    password: { type: String, require: true, select: false },
    phone : { type : Number, require : true},
    dateOfBirth: { type: String, require: true },
    // avatar : {type :  String, require : true}
}, {
    timestamps: true
});

const UserModel = model<IUser>("user", UserSchema);
export default UserModel;