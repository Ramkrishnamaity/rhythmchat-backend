import { Request, Response } from "express"
import { CommonParamsType, Res } from "../../lib/types/Common"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import UserModel from "../../models/User"
import { Types } from "mongoose"
import { ProfileResponceType } from "../../lib/types/Responses/User"

const getUserProfile = async (req: Request<CommonParamsType>, res: Response<Res<ProfileResponceType>>) => {
    try {

        const userData = await UserModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(req.params.id)
                }
            },
            {
                $project: {
                    createdOn: 0,
                    isDeleted: 0,
                    __v: 0
                }
            }
        ])

        // userData.length === 0?
        // res.status(ResponseCode.SUCCESS).json({
        //     status: true,
        //     message: "User Profile Fetched Successfully",
        //     data: userData[0]
        // }):
        res.status(ResponseCode.NOT_FOUND_ERROR).json({
			status: false,
			message: ResponseMessage.NOT_FOUND_ERROR
		})

    } catch (error) {
        res.status(ResponseCode.SERVER_ERROR).json({
			status: false,
			message: ResponseMessage.SERVER_ERROR,
			error
		})
    }
}



const UserProfileController = {
    getUserProfile
}

export default UserProfileController