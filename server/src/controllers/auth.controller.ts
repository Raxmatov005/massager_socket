import { Request, Response } from "express";
import z from "zod";
import prisma from "../utils/prismaConfig.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.ts";

// Validation schemas
const registerSchema = z.object({
    fullName: z.string().min(2),
    email: z.email(),
    password: z.string().min(8)
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

// Register controller
export const register = async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({ message: "Invalid creds" });
    }

    const inputs = result.data;

    const user = await prisma.user.findUnique({
        where: {email: inputs.email}
    });
    if(user) {
        return res.status(409).json({ message: "email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(inputs.password, 14);
    console.log(hashedPassword);


    const newUser = await prisma.user.create({
        data: {
            fullName: inputs.fullName,
            email: inputs.email,
            passwordHash: hashedPassword
        }
    });
    
    res.json({ message: "Hello from server" });
}

// Login controller
export const login = async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({ message: "Invalid creds" });
    }
    const inputs = result.data;

    const user = await prisma.user.findUnique({
        where: {email: inputs.email}
    });
    if(!user) {
        return res.status(404).json({ message: "Wrong creds(email)" });
    }
    const isPasswordValid = await bcrypt.compare(inputs.password, user.passwordHash);

    if(!isPasswordValid) {
        return res.status(404).json({ message: "Wrong creds(password)" });
    } console.log(isPasswordValid);

    const accessToken = generateToken(user.id);

    res.json({ message: "Hello from login route", token: accessToken, user});
}

export const profile = async (req: Request, res: Response) => {
    const imgFileName = req.file?.filename;
    const userId = req.userId;

    const updateUser = await prisma.user.update({
        where: { id: userId },
        data: { profileImg: imgFileName }
    });

    res.json({ message: "Profile updated", user: updateUser });

    // console.log("In profile controller");
    // res.json({ message: "User profile data" });
}