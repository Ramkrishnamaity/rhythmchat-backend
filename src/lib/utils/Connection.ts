import mongoose from "mongoose"
import { Redis } from "ioredis"

const mongoURL = process.env.MONGODB_URL ?? ""
const redisURL = process.env.REDIS_URL ?? ""
let redisCache: Redis


export default async function connection() {
	try {
		// mongodb connection
		await mongoose.connect(mongoURL)
		console.log("MongoDB connected.")

		// redis connection
		redisCache = new Redis(redisURL)
		console.log("Redis Connected.")

	} catch (error) {
		console.error("Connection error:", error)
		process.exit(1)
	}
}

export { redisCache }
