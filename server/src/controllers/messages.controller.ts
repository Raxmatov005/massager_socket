import type { Request, Response } from 'express';
import prisma from '../utils/prismaConfig.ts';


export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                not:req.userId
            }
        }
    })
    return res.json({ message: "Success", users: users });
}

export const newMessage = async (req: Request, res: Response) => {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const content = req.body.message;

    console.log(senderId, receiverId, content);
    const newMessage = await prisma.message.create({
        data:{
            senderId,
            receiverId,
            content
        }
    })
    res.json({message: "success✅", content: newMessage});
}

export const getMessages = async (req: Request, res: Response) => {
    const senderId = req.userId;
    const receiverId = req.params.id;


    const allMessages = await prisma.message.findMany({
        where: {
            OR: [
                {senderId: senderId, receiverId: receiverId},
                {senderId: receiverId, receiverId: senderId}
            ]
        }
    });
    res.json({message: "success✅", allMessages});
}