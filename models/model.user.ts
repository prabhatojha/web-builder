// import { Document, Model, model, Types, Schema, Query } from "mongoose"
import mongoose, { Schema, Document } from 'mongoose';


const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Full name is required']
	},
	email: {
		type: String,
		unique: [true, 'User already exist'],
		required: [true, 'Email is required']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date, default: Date.now },
	isLocked: { type: Boolean, default: false },
	isVerified: { type: Boolean, default: false }
});

export interface User {
	name: string;
	email: string;
	password: string;
	createdDate?: Date;
	updatedDate?: Date;
	isLocked?: boolean;
	isVerified?: boolean;
}

export interface UserDocument extends User, Document {
}



// UserSchema.pre<UserDocument>('save', function (next) {
// 	console.log('Pre hook called');
// 	if (this.isModified('password')) {
// 		this.password = hashPassword(this.password)
// 	}
// });

function hashPassword(pass) {
	return pass + '-Hashed password';
}

export default mongoose.model<UserDocument>('User', UserSchema);

