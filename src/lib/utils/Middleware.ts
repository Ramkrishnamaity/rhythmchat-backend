import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Res } from "../types/Common"
import { ResponseCode } from "./ResponseCode"
import { redisCache } from "./Connection"

export const middleware = async (req: Request, res: Response<Res>, next: NextFunction): Promise<void> => {
	const authorization: string | undefined = req.headers.authorization

	if (!authorization) {
		res.status(ResponseCode.AUTH_ERROR).json({
			status: false,
			message: "No credentials sent!"
		})
	} else {
		try {

			const decrypted = jwt.verify(authorization, process.env.JWT_SECRET ?? "") as JwtPayload
			const cacheToken = await redisCache.get(`user:${decrypted._id}:token`)
			if (cacheToken !== authorization) {
				res.status(ResponseCode.LOGOUT).json({
					status: false,
					message: "This Session is Expired, Please Logout."
				})
			} else {
				req.User = {
					_id: decrypted._id
				}
				next()
			}

		} catch (error) {
			res.status(ResponseCode.LOGOUT).json({
				status: false,
				message: "This Session is Expired, Please Logout."
			})
		}
	}
}