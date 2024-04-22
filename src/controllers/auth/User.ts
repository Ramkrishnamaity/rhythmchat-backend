import { Request, Response } from "express"
import { CommonParamsType, Res } from "../../lib/types/Common"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import { UserRegisterRequest } from "../../lib/types/Requests/Auth/User"
import { InputValidator } from "../../lib/utils/ErrorHandler"
import UserModel from "../../models/User"
import { UserLoginResponse } from "../../lib/types/Responses/Auth/User"
import CommonUtilitys from "../../lib/utils/Common"



const login = async (req: Request<CommonParamsType>, res: Response<Res<UserLoginResponse>>): Promise<void> => {
	try {

		const user = await UserModel.findOne({
			phoneNumber: req.params.id
		})

		if(user) {

			res.status(ResponseCode.SUCCESS).json({
				status: true,
				message: "User Logged in Successfully",
				data: {
					_id: user._id
				}
			})

		} else {

			const userName = await CommonUtilitys.getUsername()
			const user = await UserModel.create({
				userName,
				phoneNumber: req.params.id
			})

			res.status(ResponseCode.SUCCESS).json({
				status: true,
				message: "User Logged in Successfully",
				data: {
					_id: user._id
				}
			})

		}

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