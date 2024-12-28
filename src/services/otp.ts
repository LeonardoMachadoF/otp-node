import { v4 as uuid } from "uuid";
import { prisma } from "../libs/prisma";

export const generateOtp = async (userId: number) => {
    let otpArray: number[] = new Array(6).fill(0).map(() => Math.floor(Math.random() * 9));

    let code: string = otpArray.join("");
    let expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const otp = await prisma.otp.create({
        data: {
            id: uuid(),
            code,
            userId,
            expiresAt
        }
    });

    return otp;
}

export const validadeOTP = async (id: string, code: string) => {
    const otp = await prisma.otp.findFirst({
        select: {
            user: true
        },
        where: {
            id,
            code,
            expiresAt: {
                gt: new Date()
            },
            used: false
        }
    })

    console.log(id, code)

    if (otp && otp.user) {
        await prisma.otp.update({
            where: { id },
            data: { used: true }
        })
        return otp.user;
    }

    return false;
}