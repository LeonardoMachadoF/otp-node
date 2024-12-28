import { z } from "zod";

export const authSignInSchema = z.object({
    email: z.string({ message: "Campo E-mail é obriigatório" }).email("E-mail inválido")
});