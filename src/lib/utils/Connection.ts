import mongoose from "mongoose"
import { configDotenv } from "dotenv"
configDotenv()

export const connectDB = (): void => {
	const mongoURI: string = process.env.MONGODB_URI ?? "mongodb://localhost:27017/rhythmchat"

	mongoose.connect(mongoURI)
		.then(() => {
			console.log("MongoDB connected")
		})
		.catch((error) => {
			console.error("MongoDB connection error:", error)
		})
}