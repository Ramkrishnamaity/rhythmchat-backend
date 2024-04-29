
import { Request, Response } from "express"
import { CommonParamsType, Res } from "../../lib/types/Common"
import { DashboardResponceType } from "../../lib/types/Responses/User/Dashboard"
import CommonUtilitys from "../../lib/utils/Common"
import { InputValidator } from "../../lib/utils/ErrorHandler"
import { ResponseCode, ResponseMessage } from "../../lib/utils/ResponseCode"
import UserModel from "../../models/User"
import { Types } from "mongoose"


const getDashBoardData = (req: Request<CommonParamsType>, res: Response<Res<DashboardResponceType>>): void => {
    try {
        InputValidator(req.params, {
            id: "required"
        }).then(async () => {

            try{
                console.log(req.cookies)
            } catch(error) {
                console.log("object")
            }

            const dashboardData = await UserModel.aggregate([
                {
                    $match: {
                        _id: new Types.ObjectId(req.params.id),
                        isDeleted: false
                    }
                },
                {
                    $project: {
                        _id: 0,
                        firstName: 1,
                        lastName: 1,
                        image: 1
                    }
                }
            ])

            res.status(ResponseCode.SUCCESS).json({
                status: true,
                message: "User Dashboard Data Fetched in Successfully",
                data: dashboardData[0]
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


const UserDashboardController = {
    getDashBoardData
}

export default UserDashboardController