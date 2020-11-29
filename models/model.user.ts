// import { Document, Model, model, Types, Schema, Query } from "mongoose"
import mongoose, { Schema, Document } from 'mongoose';
var bcrypt = require('bcryptjs');

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
	isVerified: { type: Boolean, default: false },
	resetPasswordToken: { type: String },
	resetTokenExpiryTime: Number
});

export interface User {
	name: string;
	email: string;
	password: string;
	createdDate?: Date;
	updatedDate?: Date;
	isLocked?: boolean;
	isVerified?: boolean;
	resetPasswordToken?: string;
	resetTokenExpiryTime?: number;
}

export interface UserDocument extends User, Document {

}



UserSchema.pre<UserDocument>('save', function (next) {
	if (this.isModified('password')) {
		this.password = hashPassword(this.password)
	}
	next();
});

export function hashPassword(pass) {
	return bcrypt.hashSync(pass, 10);
}

export function getRandomToken() {
	return bcrypt.ran( 10);
}

export function comparePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

export default mongoose.model<UserDocument>('User', UserSchema);

