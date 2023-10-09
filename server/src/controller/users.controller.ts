import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, IUserLogin } from "../interface/user.interface";
import UserModel from "../model/users.schema";
import { v2 as cloudinary } from "cloudinary";

export const register = async (req: Request, res: Response) => {
    try {
        const { name,email, password, confirmPassword, phone, dateOfBirth}: IUser =
        req.body;
        console.log('req.body: ', req.body);
        
        if(password !== confirmPassword) {
            console.log('password !== confirmPassword: ', password !== confirmPassword);
            return res.status(422).send({ error: "password and confirm password mismatched !" });
        }

        // const userExist = await UserModel.findOne({ email: email });
        // console.log('userExist: ', userExist);
        // if (userExist) return res.status(409).send({ msg: "User already exist!" });
        
        // const myCloud = await cloudinary.uploader.upload(avatar,{
        //     folder: "avatars",
        //     width: 250,
        //     crop: "scale",
        // });
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await UserModel.create({
            email,
            password: hashedPassword,
            // phone,
            // dateOfBirth,
            // avatar : {
            //     public_id: myCloud.public_id as string,
            //     url: myCloud.secure_url as string
            // },
            // name
        });
        // await createUser.save(); 
            console.log('createUser: ', createUser);

        const token = sign(
            { id: createUser._id , email: createUser.email },
            "JWTSECRET",
            { expiresIn: "2 days" }
            );
            console.log('token: ', token);
            
        return res.status(201).json('{ token, createUser }');
    } catch (err) {
        console.log({ err: err });
        res.status(501).send({ err: "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response) => {

    try {
        const { email, password }: IUserLogin = req.body;

        const user = await UserModel.findOne({ email: email }).select("+password");
        if (!user?.email) return res.status(404).send({msg : "User doesn't exits in DataBase !!"});

        const compare = (await bcrypt.compare(password, user.password));

        if (!compare) return res.status(404).send({msg : "CREDENTIALS ARE NOT VALID "});

        if (compare) {
            const token = sign({ email: user.email, id : user._id }, "JWTSECRET", {
                expiresIn: "2 days",
            })

            res.status(201).send({
                msg: "User Logged-in !",
                token: token
            });
        }
    } catch (error) {
        console.log({ error: error });
        res.status(501).send({error : 'Internal Server Error'});
    }

};

export const get = async (req: Request, res: Response) => {
    const data = await UserModel.find({});
    return res.status(200).send(data);
}
