import mongoose from "mongoose"
import { Redis } from "ioredis"
import { Transporter, createTransport } from "nodemailer"

const mongoURL = process.env.MONGODB_URL ?? ""
const redisURL = process.env.REDIS_URL ?? ""
const host = process.env.MAIL_HOST ?? ""
const user = process.env.MAIL_USER ?? ""
const pass = process.env.MAIL_PASS ?? ""
let redisCache: Redis
let transporter: Transporter


export default async function connection() {
	try {
		// mongodb connection
		await mongoose.connect(mongoURL)
		console.log("MongoDB connected.")

		// redis connection
		redisCache = new Redis(redisURL)
		console.log("Redis Connected.")

		// nodemailer transporter connect
		const configOptions = {
			host: host,
			port: 465,
			secure: true,
			auth: {
				user: user,
				pass: pass
			}
		}
		transporter = createTransport(configOptions)
		console.log("Mail Transporter Initialized")
	} catch (error) {
		console.error("Connection error:", error)
		process.exit(1)
	}
}

export { redisCache, transporter }
