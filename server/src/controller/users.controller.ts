import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser, IUserLogin } from "../interface/user.interface";
import UserModel from "../model/users.schema";
import { v2 as cloudinary } from "cloudinary";
import { IUserChangePswd } from "../interface/product.interface";
import sendJWTToken from "../utils/sentJWTToken";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      dateOfBirth,
    }: IUser = req.body;

    if (password !== confirmPassword) {
      return res
        .status(422)
        .send({ error: "password and confirm password mismatched !" });
    }

    const userExist = await UserModel.findOne({ email: email });
    if (userExist) return res.status(409).send({ msg: "User already exist!" });

    // const myCloud = await cloudinary.uploader.upload( req.body.avatar,{
    //     folder: "avatars",
    //     width: 250,
    //     crop: "scale",
    // });

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await UserModel.create({
      email,
      password: hashedPassword,
      phone,
      dateOfBirth,
      // avatar : {
      //     public_id: myCloud.public_id as string,
      //     url: myCloud.secure_url as string
      // },
      name,
    });
    await createUser.save();

    sendJWTToken(createUser, 201, res);

  } catch (err) {
    console.log({ err: err });
    res.status(501).send({ err: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: IUserLogin = req.body;

    const user = await UserModel.findOne({ email: email }).select("+password");
    if (!user?.email)
      return res.status(404).send({ msg: "User doesn't exits in DataBase !!" });

    const compare = await bcrypt.compare(password, user.password);

    if (!compare)
      return res.status(404).send({ msg: "CREDENTIALS ARE NOT VALID " });

    if (compare) {
      sendJWTToken(user, 201, res);
    }
  } catch (error) {
    console.log({ error: error });
    res.status(501).send({ error: "Internal Server Error" });
  }
};

export const get = async (req: Request, res: Response) => {
  const data = await UserModel.find({});
  return res.status(200).send(data);
};

export const userLogout = async (req: Request, res: Response) => {
  const expireJWTToken = res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User Logged Out !",
  });
};

export const userChangePassword = async (req: Request, res: Response) => {
  const {user} = req;
  const { password, newPassword, confirmNewPassword }: IUserChangePswd =
    req.body;


  const userLogged = await UserModel.findOne({ _id: user }).select("+password");

  if (!userLogged) return res.status(404).send({msg : "User Doesn't exist !"});

  if (newPassword !== confirmNewPassword) {
    return res
      .status(422)
      .send({ error: "password and confirm password mismatched !" });
  }

  const comparePswd = await bcrypt.compare(password, userLogged?.password);

  if (!comparePswd) {
    return res.status(401).send({ error: "Your credentials are wrong !" });
  }

  const hashedNewPswd = await bcrypt.hash(newPassword, 10);
  userLogged.password = hashedNewPswd;
  await userLogged.save();

  res.status(201).send({
    isSuccess: true,
    msg: "Creds updated successfully !",
  });
};
