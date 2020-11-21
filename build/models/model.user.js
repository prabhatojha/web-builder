"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
// import { Document, Model, model, Types, Schema, Query } from "mongoose"
var mongoose_1 = __importStar(require("mongoose"));
var bcrypt = require('bcryptjs');
var UserSchema = new mongoose_1.Schema({
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
UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = hashPassword(this.password);
    }
    next();
});
function hashPassword(pass) {
    return bcrypt.hashSync(pass, 10);
}
exports.hashPassword = hashPassword;
function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
exports.comparePassword = comparePassword;
exports.default = mongoose_1.default.model('User', UserSchema);
