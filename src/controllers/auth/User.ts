import { Request, Response } from "express"
import { CommonParamsType, Res } from "../../lib/types/Common"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import { LoginRequestType } from "../../lib/types/Requests/Auth/User"
import { InputValidator } from "../../lib/utils/ErrorHandler"
import UserModel from "../../models/User"
import { UserLoginResponse } from "../../lib/types/Responses/Auth/User"
import CommonUtilitys from "../../lib/utils/Common"



const login = (req: Request<any, any, LoginRequestType>, res: Response<Res<UserLoginResponse>>): void => {
	try {
		InputValidator(req.body, {
			phoneNumber: "required"
		}).then(async () => {

			const user = await UserModel.findOne({
				phoneNumber: req.body.phoneNumber
			})

			if (user) {

				const token = CommonUtilitys.getNewToken(user._id)
				res.cookie("token", token, {
					httpOnly: true,
					sameSite: "strict",
					secure: true
				})

				res.status(ResponseCode.SUCCESS).json({
					status: true,
					message: "User Logged in Successfully",
					data: {
						_id: user._id,
						isNew: false,
						token
					}
				})

			} else {

				const userName = await CommonUtilitys.getUsername()
				const user = await UserModel.create({
					userName,
					phoneNumber: req.body.phoneNumber
				})

				const token = CommonUtilitys.getNewToken(user._id)
				res.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict; Secure`);

				res.status(ResponseCode.SUCCESS).json({
					status: true,
					message: "User Logged in Successfully",
					data: {
						_id: user._id,
						isNew: true,
						token
					}
				})

			}

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


const UserAuthController = {
	login
}

export default UserAuthController