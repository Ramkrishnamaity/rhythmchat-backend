import mongoose from "mongoose"
import { Redis } from "ioredis"

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

const redisURL = process.env.REDIS_URL ?? ""
let redisCache: Redis

if(redisURL !== "") {
	redisCache = new Redis()
	console.log("Redis Connected.")
} else {
	console.log("Redis Connection Error: Url Not Found.")
	process.exit(1)
}

export {redisCache}

