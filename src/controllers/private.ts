import { Response } from "express";
import { ExtendedRequest } from "../types/extendend-request";
import { getUserById } from "../services/user";

export const test = async (req: ExtendedRequest, res: Response) => {
    if (!req.userId) {
        res.status(401).json({ error: "Acesso negado" });
        return;
    }
    const user = await getUserById(req.userId);

    res.json({ user });
    return;
}