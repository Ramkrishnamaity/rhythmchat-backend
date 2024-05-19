import mongoose, { Document, Schema } from "mongoose"
import { UserModelType } from "../lib/types/Models/User"
import { CommonModelType } from "../lib/types/Models"

const UserSchema = new Schema<UserModelType<CommonModelType & Document>>({
	about: {
		type: String,
		required: [true, "About is Required."]
	},
	firstName: {
		type: String,
		required: [true, "First Name is Required."]
	},
	lastName: {
		type: String,
		required: [true, "Last Name is Required."]
	},
	email: {
		type: String,
		required: [true, "Email is required."],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password is Required."]
	},
	image: {
		type: String,
		default: "http://127.0.0.1:4050/api/v1/uploads/profile.png"
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	updatedOn: {
		type: Date,
		default: Date.now
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
})


const UserModel = mongoose.model<UserModelType<CommonModelType & Document>>("User", UserSchema)

export default UserModel