import express, { Application } from "express"
import connection from "./lib/utils/Connection"
import rootRoute from "./routes/Index"
import logger from "morgan"
import path from "path"
import cors from "cors"


const app: Application = express()
const port = process.env.PORT ?? 4051

connection()


app.use(cors({
	origin: process.env.CLIENT_BASE_URL,
	credentials: true
}))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/api/v1/uploads", express.static(path.join(__dirname, "../uploads")))
app.use("/api/v1", rootRoute)
app.listen(port, () => {
	console.log(`Server is running on port http://127.0.0.1:${port}`)
})
