import { Request, Response } from "express";
import { User, findUser } from "./users";

export const handleRegistration = (req: Request, resp: Response, next) => {
    const user: User = req.body;
    if (!findUser(user.email)) {
        next();
    } else {
        resp.status(403).json({ message: "Usuário já existente!" });
    }
};
