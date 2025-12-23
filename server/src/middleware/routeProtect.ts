import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


interface jwtWithId extends jwt.JwtPayload {
    userId: string;
}


export const routeProtect = (req: Request, res: Response, next: NextFunction) => {

    if(!req.headers.authorization){
        res.status(401).json({ message: "token does not exist" });
    }

    const token = req.headers.authorization?.split(" ")[1];

    try{
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as jwtWithId;
        req.userId = decoded.userId;
        next();
    } catch(e) {
        console.log(e);
        res.status(401).json({ message: "token expired or has been changed" });
    }

    console.log("In route protect middleware");
}