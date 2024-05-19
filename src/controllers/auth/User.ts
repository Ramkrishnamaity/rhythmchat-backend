import { Request, Response } from "express"
import { Res } from "../../lib/types/Common"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import { LoginRequestType, RegisterRequestType } from "../../lib/types/Requests/Auth/User"
import { InputValidator } from "../../lib/utils/ErrorHandler"
import { UserLoginResponse, UserRegisterResponse } from "../../lib/types/Responses/Auth/User"
import UserModel from "../../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { redisCache } from "../../lib/utils/Connection"


function generateToken(payload: { _id: string }) {
	return jwt.sign(payload, process.env.JWT_SECRET ?? "waj648kfsaaf", { expiresIn: "1d" })
}

const login = async (req: Request<any, any, LoginRequestType>, res: Response<Res<UserLoginResponse>>): Promise<void> => {
	try {

		InputValidator(req.body, {
			email: "required",
			password: "required"
		})
			.then(async () => {

				const user = await UserModel.findOne({ email: req.body.email })

				if (!user) {
					res.status(ResponseCode.BAD_REQUEST).json({
						status: false,
						message: "User not Found."
					})
				} else {

					if (!bcrypt.compareSync(req.body.password, user.password)) {

						res.status(ResponseCode.AUTH_ERROR).json({
							status: false,
							message: "Incorrect Password or User."
						})

					} else {

						const token = generateToken({ _id: user._id })

						// push in redis cache
						await redisCache.set(`user:${user._id}:token`, token)

						res.status(ResponseCode.SUCCESS).json({
							status: true,
							message: "User Logged in Successfully",
							data: {
								token
							}
						})

					}

				}

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

const register = (req: Request<any, any, RegisterRequestType>, res: Response<Res<UserRegisterResponse>>): void => {
	try {

		InputValidator(req.body, {
			email: "required",
			password: "required",
			about: "required",
			firstName: "required",
			lastName: "required"
		})
			.then(async () => {

				const isExist = await UserModel.findOne({ email: req.body.email })

				if (isExist) {

					res.status(ResponseCode.BAD_REQUEST).json({
						status: false,
						message: "User Already Registered."
					})

				} else {

					const salt = bcrypt.genSaltSync(10)
					const hashedPassword = bcrypt.hashSync(req.body.password, salt)

					const user = await UserModel.create({
						...req.body,
						password: hashedPassword
					})

					const token = generateToken({ _id: user._id })

					// push in redis cache
					await redisCache.set(`user:${user._id}:token`, token)

					res.status(ResponseCode.SUCCESS).json({
						status: true,
						message: "User Registered Successfully",
						data: {
							token
						}
					})

				}

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