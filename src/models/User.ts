import mongoose, { Document, Schema } from "mongoose"
import { UserModelType } from "../lib/types/Models/User"
import { CommonModelType } from "../lib/types/Models"

const UserSchema = new Schema<UserModelType<CommonModelType & Document>>({
	userName: {
		type: String,
		required: [true, "Username is required."],
		unique: true
	},
	bio: {
		type: String,
		required: [true, "Bio is required."]
	},
	firstName: {
		type: String,
		required: [true, "FirstName is required."],
	},
	lastName: {
		type: String,
		required: [true, "LastName is required."],
	},
	email: {
		type: String,
		unique: true
	},
	phoneNumber: {
		type: String,
		required: [true, "Phone Number is required."],
		unique: true
	},
	image: {
		type: String,
		default: "/uploads/profile.png"
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