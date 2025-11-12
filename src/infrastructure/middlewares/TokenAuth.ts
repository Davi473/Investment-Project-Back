import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

if (!process.env.TOKEN_KEY) {
  throw new Error("TOKEN_KEY não definida nas variáveis de ambiente.");
}
const SECRET_KEY = process.env.TOKEN_KEY;

export function generateToken(payload: {}): string {
  return jwt.sign(payload, SECRET_KEY, {expiresIn: "1d"});
}


export function tokenAuth(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não informado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}
