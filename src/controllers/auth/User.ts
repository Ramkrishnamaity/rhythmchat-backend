import { Request, Response } from "express"
import { CommonParamsType, Res } from "../../lib/types/Common"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import { UserRegisterRequest } from "../../lib/types/Requests/Auth/User"
import { InputValidator } from "../../lib/utils/ErrorHandler"
import UserModel from "../../models/User"
import { UserLoginResponse, UserRegisterResponse } from "../../lib/types/Responses/Auth/User"



const login = async (req: Request<CommonParamsType>, res: Response<Res<UserLoginResponse>>): Promise<void> => {
	try {

		const user = await UserModel.findById(req.params.id)

		user? 
		res.status(ResponseCode.SUCCESS).json({
			status: true,
			message: "User Logged in Successfully",
			data: {
				_id: user._id,
				token: ""
			}
		}): 
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

const register = (req: Request<any, any, UserRegisterRequest>, res: Response<Res<UserRegisterResponse>>): void => {
	try {

		InputValidator(req.body, {
			userName: "required",
			bio: "required",
			firstName: "required",
			lastName: "required",
			phoneNumber: "required"
		})
		.then(async () => {

			const user = await UserModel.create({...req.body})

			res.status(ResponseCode.SUCCESS).json({
				status: true,
				message: "User Registered Successfully",
				data: {
					_id: user._id,
					token: ""
				}
			})

		})
		.catch(error => {
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

const UserAuthController = {
	login,
	register
}

export default UserAuthController