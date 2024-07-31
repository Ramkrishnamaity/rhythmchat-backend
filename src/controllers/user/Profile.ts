import { Request, Response } from "express"
import { Res } from "../../lib/types/Common"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import UserModel from "../../models/User"
import { Types } from "mongoose"
import { ProfileResponceType } from "../../lib/types/Responses/User"
import { UpdateProfileRequestType } from "../../lib/types/Requests/User/Profile"
import { InputValidator } from "../../lib/utils"

const getUserProfile = async (req: Request, res: Response<Res<ProfileResponceType>>) => {
	try {

		const userData = await UserModel.aggregate([
			{
				$match: {
					_id: new Types.ObjectId(req.User?._id)
				}
			},
			{
				$project: {
					password: 0,
					createdOn: 0,
					isDeleted: 0,
					__v: 0
				}
			}
		])

		userData.length !== 0 ?
			res.status(ResponseCode.SUCCESS).json({
				status: true,
				message: "User Profile Fetched Successfully",
				data: userData[0]
			}) :
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

const updateProfile = (req: Request<any, any, UpdateProfileRequestType>, res: Response<Res>) => {
	try {
		InputValidator(req.body, {
			about: "required",
			firstName: "required",
			lastName: "required",
			image: "required"
		}).then(async () => {

			await UserModel.findByIdAndUpdate(req.User?._id, {
				$set: {...req.body}
			})
			res.status(ResponseCode.SUCCESS).json({
				status: true,
				message: "User Profile Updated Successfully"
			})

		}).catch(error => {
			res.status(ResponseCode.VALIDATION_ERROR).json({
				status: false,
				message: ResponseMessage.VALIDATION_ERROR,
				error
			})
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
	getUserProfile,
	updateProfile
}

export default UserProfileController