// import { sendMail } from "../services/nodeMailer";

// export const sendVerifyMail = async (email: string) => {
//     try {
//         const subject = "Delivery Document Verification Successful";
//         const text = `Hello,

//         We’re pleased to inform you that your documents have been successfully verified!
//         Your profile is now marked as verified on our platform. You are now eligible to receive delivery assignments and start working with us.
//         If you have any questions or need further assistance, feel free to contact our support team.

//         Thank you for joining the Eatzaa Delivery Partner network!

//         Best regards,  
//         The Eatzaa Team`;
//         await sendMail(email, subject, text)
//     } catch (error) {
//         console.log("sendVerifyMail fun", error);
//     }
// }



import { INodemailerService } from '../services/interfaces/nodemailer.service.interface';

export const sendVerifyMail = async (email: string, nodemailerService: INodemailerService) => {
    try {
        const subject = 'Delivery Document Verification Successful';
        const text = `Hello,

We’re pleased to inform you that your documents have been successfully verified!
Your profile is now marked as verified on our platform. You are now eligible to receive delivery assignments and start working with us.
If you have any questions or need further assistance, feel free to contact our support team.

Thank you for joining the Eatzaa Delivery Partner network!

Best regards,
The Eatzaa Team`;

        await nodemailerService.sendMail(email, subject, text);
    } catch (error) {
        console.error('Error in sendVerifyMail:', error);
        throw new Error((error as Error).message);
    }
};