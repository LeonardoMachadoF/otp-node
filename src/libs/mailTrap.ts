import { MailtrapClient } from "mailtrap"

export const sendEmail = async (to: string, subject: string, body: string) => {
    const mailtrap = new MailtrapClient({
        token: process.env.MAILTRAP_TOKEN as string,
        testInboxId: 3364677
    });


    try {
        await mailtrap.testing.send({
            from: { email: "sistema@gmail.com", name: "Sistema" },
            to: [{ email: to }],
            subject,
            text: body
        })
        return true;
    } catch (err) {
        return false;
    }
}