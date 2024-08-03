import { Request, Response } from "express"
import { Res } from "../../lib/types/Common"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import BucketUpload from "../../lib/utils/Upload"
import { fileSupportedFormat, storySupportedFormat } from "../../lib/utils"
import { FileUploadResponce, VideoUploadResponce } from "../../lib/types/Responses/User/Upload"



const fileUpload = async (req: Request, res: Response<Res<VideoUploadResponce | FileUploadResponce>>): Promise<void> => {
	try {
		if (req.file) {
			const type = req.file.mimetype.split('/')[0]
			if (fileSupportedFormat.includes(type)) {

				const data = (type === 'video') ? await BucketUpload.videoUpload(req.file, req.User?._id ?? '') : await BucketUpload.fileUpload(req.file, req.User?._id ?? '')
				res.status(ResponseCode.SUCCESS).json({
					status: true,
					message: "File Uploaded Successfully.",
					data
				})

			} else {
				res.status(ResponseCode.BAD_REQUEST).json({
					status: false,
					message: "File Not Supported."
				})
			}
		} else {
			res.status(ResponseCode.NOT_FOUND_ERROR).json({
				status: false,
				message: "File Not Found."
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


const storyUpload = async (req: Request, res: Response<Res<VideoUploadResponce | FileUploadResponce>>): Promise<void> => {
	try {
		if (req.file) {
			const type = req.file.mimetype.split('/')[0]
			if (storySupportedFormat.includes(type)) {
				const data = (type === 'video') ? await BucketUpload.videoUpload(req.file, req.User?._id ?? '') : await BucketUpload.fileUpload(req.file, req.User?._id ?? '')
				res.status(ResponseCode.SUCCESS).json({
					status: true,
					message: "File Uploaded Successfully.",
					data
				})
			} else {
				res.status(ResponseCode.BAD_REQUEST).json({
					status: false,
					message: "File Not Supported."
				})
			}
		} else {
			res.status(ResponseCode.NOT_FOUND_ERROR).json({
				status: false,
				message: "File Not Found."
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



const UploadController = {
	fileUpload,
	storyUpload
}

export default UploadController