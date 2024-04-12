import { Request, Response } from "express"
import UserModel from "../../models/User"
import { Res } from "../../lib/types/Common"
import { UserProfileType } from "../../lib/types/Responses/User"
import { dbError } from "../../lib/utils/ErrorHandler"
import mongoose from "mongoose"
import { ResponseCode } from "../../lib/utils/ResponseCode"

const getUserProfile = (req: Request, res: Response<Res<UserProfileType>>): void => {
	UserModel.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(req.User?._id)
			}
		},
		{
			$project: {
				__v: 0,
				token: 0,
				createdOn: 0,
				updatedOn: 0,
				isDeleted: 0,
				password: 0
			}
		}
	])
		.then((result: Array<UserProfileType>) => {
			res.status(ResponseCode.SUCCESS).json({
				status: true,
				data: result[0],
				message: "Successfully Get UserProfile"
			})
		})
		.catch((error) => {
			dbError(error, res)
		})
}

const UserController = {
	getUserProfile
}

export default UserController