import Taro from '@tarojs/taro';
import { Sprite } from '@/types/index';
import { canvasW } from '../config';

export const cleanCanvas = (canvasId: string) => {
    const ctx = Taro.createCanvasContext(canvasId);
    // ctx.setFillStyle('#ffffff')
    // ctx.fillRect(0, 0, 200, 200)
    ctx.draw();
};

export const mergeImgData = (
    bottomLayerImgData: Uint8ClampedArray,
    imgData: Uint8ClampedArray
) => {
    for (let i = 0, len = imgData.length; i < len; i += 4) {
        if (imgData[i + 3] === 255) {
            bottomLayerImgData[i] = imgData[i];
            bottomLayerImgData[i + 1] = imgData[i + 1];
            bottomLayerImgData[i + 2] = imgData[i + 2];
            bottomLayerImgData[i + 3] = imgData[i + 3];
        }
    }
};

export const addWhiteBackground = (imgData: Uint8ClampedArray) => {
    for (let i = 0, len = imgData.length; i < len; i += 4) {
        if (imgData[i + 3] === 0) {
            imgData[i] = 255;
            imgData[i + 1] = 255;
            imgData[i + 2] = 255;
            imgData[i + 3] = 255;
        }
    }
};

export const drawImage = (ctx: Taro.CanvasContext, sprite: Sprite) => {
    ctx.save();
    if (sprite.isFlip) {
        ctx.translate(canvasW, 0);
        ctx.scale(-1, 1);
    }
    if (sprite.degrees) {
        //绕自身中心旋转
        // const x_ = x + w / 2
        // const y_ = y + h / 2
        // ctx.translate(x_, y_)
        // ctx.rotate((Math.PI/180)*degrees)
        // ctx.translate(-x_, -y_)

        //绕canvas中心旋转
        const canvasCenter = canvasW / 2;
        ctx.translate(canvasCenter, canvasCenter);
        ctx.rotate((Math.PI / 180) * sprite.degrees);
        ctx.translate(-canvasCenter, -canvasCenter);
    }
    ctx.drawImage(
        sprite.path,
        sprite.x,
        sprite.y,
        sprite.w * sprite.scale,
        sprite.h * sprite.scale
    );
    if (sprite.isFlip) {
        ctx.translate(canvasW, 0);
        ctx.scale(-1, 1);
    }
    ctx.draw(true);
    ctx.restore();
};

export const centralizedDraw = (ctx: Taro.CanvasContext, sprites: Sprite[]) => {
    for (let i = 0, len = sprites.length; i < len; i++) {
        drawImage(ctx, sprites[i]);
    }
};

export const checkFlip = (spriteList: Sprite[], path: string) => {
    for (let i = 0, len = spriteList.length; i < len; i++) {
        if (spriteList[i].path === path) {
            return true;
        }
    }
    return false;
};

export const updateSpriteList = (spriteList: Sprite[], sprite: Sprite) => {
    const newSpriteList = [...spriteList];
    for (let i = 0, len = newSpriteList.length; i < len; i++) {
        if (newSpriteList[i].id === sprite.id) {
            newSpriteList[i] = sprite;
            break;
        }
    }
    return newSpriteList;
};
