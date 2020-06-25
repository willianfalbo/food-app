import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import * as config from './config';

export const handleAuthorization = (req: Request, resp: Response, next) => {
    const token: string = extractToken(req);
    if (!token) {
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"'); // optional line
        resp.status(401).json({ message: 'Unauthorized.' });
    } else {
        jwt.verify(token, config.APP_SECRET_KEY, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                resp.status(403).json({ message: 'Unauthorized.' });
            }
        });
    }
};

function extractToken(req: Request): string {
    let token: string = undefined;
    if (req.headers && req.headers.authorization) {
        const parts: string[] = req.headers.authorization.toString().split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
