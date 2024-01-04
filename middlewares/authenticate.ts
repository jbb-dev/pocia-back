import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

interface IUserTokenPayload {
    id: string,
    generatedAt: string,
    iat: number
}

export interface RequestWithPayload extends Request {
    payload?: IUserTokenPayload;
}

export const authenticateUser = async (req: RequestWithPayload, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) 
    {
        return res.status(401).json({ message : `You need to be connected to access data` });
    }

    try {
        const decoded = await new Promise<IUserTokenPayload>((resolve, reject) => {
            jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
                if (err) 
                {
                    reject(err);
                } 
                else 
                {
                    resolve(decoded as IUserTokenPayload);
                }
            });
        });

        req.payload = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Your session has expired, please reconnect" });
    }

};
