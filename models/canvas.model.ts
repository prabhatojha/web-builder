import { Schema } from "mongoose";

export const CanvasSchema = new Schema({
    tag: String,
    locked: Boolean,
    innerText: String,
    transform: Object,
    children: {
        type: Array
    }
});

export interface Canvas {
    tag: string,
    locked: boolean,
    innerText: string,
    transform: CanvasTransform,
    children: Canvas[]
}

export interface CanvasTransform {
    rotate: number;
    translateX: number;
    translateY: number;
    scaleX: number;
    scaleY: number;

    groupableInfo: CanvasTransform;
    rect: any;
}
