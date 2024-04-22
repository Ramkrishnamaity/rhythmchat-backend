import { generateUsername } from "unique-username-generator"
import UserModel from "../../models/User"
import { UserModelType } from "../types/Models/User"
import { Document } from "mongoose"

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


const CommonUtilitys = {
    getUsername
}

export default CommonUtilitys 