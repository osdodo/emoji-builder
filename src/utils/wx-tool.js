import { promise } from 'when'

export const canvasGetImageData = (canvasId, dx, dy, dWidth, dHeight) => {
    return new Promise((resolve, reject) => {
        wx.canvasGetImageData({
            canvasId: canvasId,
            x: dx,
            y: dy,
            width: dWidth,
            height: dHeight,
            success: res => {
                resolve(res.data)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export const canvasPutImageData = (canvasId, dx, dy, dWidth, dHeight, imageData) => {
    return new Promise((resolve, reject) => {
        wx.canvasPutImageData({
            canvasId: canvasId,
            x: dx,
            y: dy,
            width: dWidth,
            height: dHeight,
            data: imageData,
            success: res => {
                resolve()
            },
            fail: err => {
                reject(err)
            }
        })
    })
}

export const canvasToTempFilePath = (canvasId) => {
    return new promise((resolve, reject) => {
        setTimeout(() => {
            wx.canvasToTempFilePath({
                canvasId,
                success: res => {
                    resolve(res.tempFilePath)
                },
                fail: err => {
                    reject(err)
                }
            })
        },2000)
    })
}

export const saveImageToPhotosAlbum = (filePath) => {
    return new promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: () => {
                resolve()
            },
            fail: e => {
                if (e.errMsg.indexOf('auth') != -1) {
                    wx.showModal({
                        content: '❗同意访问您的相册，才能保存图片',
                        showCancel: false,
                        success: (tip) => {
                            if (tip.confirm) {
                                wx.openSetting({
                                    success: (res) => { }
                                })
                            }
                        }
                    })
                } else {
                    wx.showToast({
                        title: '❌保存失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
                reject(e)
            }
        })
    })
}

export const cleanCanvas = (canvasId) => {
    const ctx = wx.createCanvasContext(canvasId)
    // ctx.setFillStyle('#ffffff')
    // ctx.fillRect(0, 0, 200, 200)
    ctx.draw()
}

export const mergeImgData = (bottomLayerImgData, imgData) => {
    for (let i = 0, len = imgData.length; i < len; i += 4) { 
        if (imgData[i + 3] === 255) {
            bottomLayerImgData[i] = imgData[i]
            bottomLayerImgData[i + 1] = imgData[i + 1]
            bottomLayerImgData[i + 2] = imgData[i + 2]
            bottomLayerImgData[i + 3] = imgData[i + 3]
        }
    } 
}

export const addWhiteBackground = (imgData) => {
    for (let i = 0, len = imgData.length; i < len; i += 4) { 
        if (imgData[i + 3] === 0) {
            imgData[i] = 255
            imgData[i + 1] = 255
            imgData[i + 2] = 255
            imgData[i + 3] = 255
        }
    } 
}

export const drawImage = (ctx, path, x, y, w, h, scale=1, degrees=0, isFlip = false) => {
    ctx.save() 
    if (isFlip) {
        ctx.translate(200, 0)
        ctx.scale(-1, 1)
    }
    if (degrees) {
        //绕自身中心旋转
        // const x_ = x + w / 2
        // const y_ = y + h / 2
        // ctx.translate(x_, y_)
        // ctx.rotate((Math.PI/180)*degrees)
        // ctx.translate(-x_, -y_)

        //绕canvas中心旋转
        ctx.translate(100, 100)
        ctx.rotate((Math.PI / 180) * degrees)
        ctx.translate(-100, -100)
    }
    ctx.drawImage(path, x, y, w * scale, h * scale)
    ctx.draw(true)
    ctx.restore() 
}

export const centralizedDraw = (ctx, sprites) => {
    for (let i = 0, len = sprites.length; i < len; i++) {
        drawImage(
            ctx, 
            sprites[i].path, 
            sprites[i].x, sprites[i].y, 
            sprites[i].w, sprites[i].h, 
            sprites[i].scale, 
            sprites[i].degrees,
            sprites[i].isFlip
        )
    }
}
