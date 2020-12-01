
export interface CanvasPage {
    name: string;
    previewImage: string;
    canvas: Canvas;
}

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
