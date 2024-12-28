import { z } from "zod";

export const authUseOTPSchema = z.object({
    id: z.string({ message: "Id obrigatorio" }),
    code: z.string({ message: "OTP obrigatório" }).length(6, "Código precisa de 6 numeros")
});