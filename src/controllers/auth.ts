import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { createUser, getUserByEmail } from "../services/user";
import { generateOtp, validadeOTP } from "../services/otp";
import { sendEmail } from "../libs/mailTrap";
import { authSignUpSchema } from "../schemas/auth-signup";
import { authUseOTPSchema } from "../schemas/auth-useotp";
import { createJWT } from "../libs/jwt";

export const signIn: RequestHandler = async (req, res) => {
    const data = authSignInSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors })
        return;
    }

    const user = await getUserByEmail(data.data.email);
    if (!user) {
        res.json(({ error: "Usuário não existe" }));
        return;
    }

    const otp = await generateOtp(user.id);

    await sendEmail(
        user.email,
        "Seu código de acesso é: " + otp.code,
        "Digite seu código " + otp.code
    );

    res.json({
        id: otp.id
    });
}

export const signUp: RequestHandler = async (req, res) => {
    const data = authSignUpSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors })
        return;
    }

    const user = await getUserByEmail(data.data.email);
    if (user) {
        res.json(({ error: "Usuário já existente" }));
        return;
    }

    const newUser = await createUser(data.data.name, data.data.email);

    res.status(201).json({ user: newUser });
}

export const useOTP: RequestHandler = async (req, res) => {
    const data = authUseOTPSchema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten().fieldErrors })
        return;
    }
    const user = await validadeOTP(data.data.id, data.data.code);

    if (!user) {
        res.json({ error: "OTP inválido" })
        return
    }

    const token = createJWT(user.id);

    res.json({ token, user });
}