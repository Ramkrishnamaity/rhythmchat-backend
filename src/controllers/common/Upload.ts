import { Request, Response } from "express"
import { Res } from "../../lib/types/Common"
import { ResponseCode } from "../../lib/utils/ResponseCode"



const imageUpload = (req: Request, res: Response<Res<string>>): void => {
    res.status(ResponseCode.SUCCESS).json({
        status: true,
        message: "Image Uploaded Successfully.",
        data: req.file?.path
    })
}


const videoUpload = (req: Request, res: Response<Res<string>>): void => {
	res.status(ResponseCode.SUCCESS).json({
        status: true,
        message: "Video Uploaded Successfully.",
        data: req.file?.path
    })
}


const storyUpload = (req: Request, res: Response<Res<string>>): void => {
	res.status(ResponseCode.SUCCESS).json({
        status: true,
        message: "Story Uploaded Successfully.",
        data: req.file?.path
    })
}



const UploadController = {
    imageUpload,
    videoUpload,
    storyUpload
}

export default UploadController