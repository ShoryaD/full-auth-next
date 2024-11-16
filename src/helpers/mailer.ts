import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {

        // create a hash token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // updating
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, 
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000 // 1 hour from now
                }
            )
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000 // 1 hour from now
                }
            )
        }

        var transport = nodemailer.createTransport
        ({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: 'shorya@dev.com',
            to: 'shoryadubey7610@gmail.com',
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset Your Password',
            html : `<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? "Verify your email" : "reset your password"}</p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}