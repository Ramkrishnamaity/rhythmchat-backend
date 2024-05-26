import { Validator } from "node-input-validator"
import { transporter } from "./Connection"
import jwt from "jsonwebtoken"


export const InputValidator = async (input: object, rules: object): Promise<void> => {
	return new Promise((resolve, reject) => {
		const v = new Validator(input, rules)

		v.check()
			.then((match: boolean) => {
				if (!match) {
					const error = (Object.values(v.errors)[0] as any).message
					reject(error)
				} else {
					resolve()
				}
			})
			.catch((error) => {
				reject(error)
			})


	})
}

export const MailSender = async (email: string, title: string, body: string): Promise<boolean> => {
	try{
        await transporter.sendMail({
            from: "RhythmChat ORG.",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`     
        })
		return true
    } catch(error){
		console.log("Error in Mail Send: ", error)
        return false
    }
}

export default function generateToken(payload: { _id: string }) {
	return jwt.sign(payload, process.env.JWT_SECRET ?? "", { expiresIn: "1d" })
}