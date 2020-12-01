import mongoose, { Schema, Document } from 'mongoose';
import { Canvas } from './canvas.model';

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    userId: {
        type: String,
        required: [true, 'User Id is required']
    },
    pages: {
        type: Array
    }
});

export interface Project {
    userId?: string;
    name: string;
    pages: Canvas[]
}

export interface ProjectDocument extends Project, Document {

}

export default mongoose.model<ProjectDocument>('Project', ProjectSchema);