import { generateUsername } from "unique-username-generator"
import UserModel from "../../models/User"
import { UserModelType } from "../types/Models/User"
import { Document } from "mongoose"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()

const getUsername = async (): Promise<string> => {
    try {

        let username = ''
        let isExist: UserModelType<Document> | null = null

        do {
            username = generateUsername("", 3, 10)
            console.log(username)
            isExist = await UserModel.findOne({
                userName: username
            })
        } while (isExist)

        return username

    } catch (error) {
        console.log(error)
        return ""
    }
}

const getNewToken = (_id: string): string => {
    return jwt.sign({userId: _id}, process.env.JWT_SECRET ?? "", {expiresIn: "7d"})
}


const CommonUtilitys = {
    getUsername,
    getNewToken
}

export default CommonUtilitys 