import { Response } from 'express';

const sendJWTToken = (user : any, statusCode: number, res: Response): void => {
    const token: string = user.CreateJWTToken();
    console.log(token);

    // Logic for storing token in a cookie

    const options = {
        expires: new Date(
            Date.now() + (Number(1) * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
};

export default sendJWTToken;
