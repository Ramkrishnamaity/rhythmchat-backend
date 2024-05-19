import express, { Application } from "express"
import connectDB from "./lib/utils/Connection"
import rootRoute from "./routes/Index"
import logger from "morgan"
import path from "path"
import cors from "cors"


const app: Application = express()
const port = process.env.PORT ?? 4051

connectDB()


app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/api/v1", rootRoute)

app.listen(port, () => {
	console.log(`Server is running on port http://127.0.0.1:${port}`)
})
