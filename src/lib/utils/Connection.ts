import mongoose from "mongoose"
import { Redis } from "ioredis"
import { Transporter, createTransport } from "nodemailer"

// mongodb connection
export default async function connectDB() {

	const url = process.env.MONGODB_URL ?? ""

	if(url === "") {
		console.error("MongoDB connection error: Url not Found.")
		return
	}

	mongoose.connect(url)
		.then(() => {
			console.log("MongoDB connected.")
		})
		.catch((error) => {
			console.error("MongoDB connection error:", error)
			process.exit(1)
		})

}


// redis connection
const redisURL = process.env.REDIS_URL ?? ""
let redisCache: Redis

if(redisURL !== "") {
	redisCache = new Redis(redisURL)
	console.log("Redis Connected.")
} else {
	console.log("Redis Connection Error: Url Not Found.")
	process.exit(1)
}

// nodemailer transporter connect
let transporter: Transporter
const configOptions = {
	host:process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
}
if(configOptions.host !== "" && configOptions.auth.pass !== "" && configOptions.auth.user !== "") {
	transporter = createTransport(configOptions)
} else {
	console.log("Node Mailer Connection Error: User Not Found.")
	process.exit(1)
}

export {redisCache, transporter}
