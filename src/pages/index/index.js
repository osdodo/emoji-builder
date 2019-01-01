import { Component } from '@tarojs/taro'
import { View, Canvas, Text } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'

import SelectBox from '../../components/selectBox/SelectBox'
import LevelSpriteList from '../../components/levelSpriteList/LevelSpriteList'
import SpriteProperty from '../../components/spriteProperty/SpriteProperty'

import { connect } from '@tarojs/redux'

import {
    pushSprite,
    updateCompleted
} from '../../actions/setting'

import {
    // canvasGetImageData,
    // canvasPutImageData,
    // mergeImgData,
    drawImage,
    centralizedDraw,
    asyncCentralizedDraw,
    canvasToTempFilePath,
    saveImageToPhotosAlbum,
} from '../../utils/wx-tool'

import './index.css'
import '../../iconfont.css'
import level_1_04 from '../../images/level1/level_1_04.png'

@connect(({ setting }) => setting,
    (dispatch) => ({
        onPushSprite(level, sprite) {
            dispatch(pushSprite(level, sprite))
        },
        onUpdateCompleted() {
            dispatch(updateCompleted())
        },
    }))
class Index extends Component {
    state = {
        showLoading: false
    }

    config = {
        navigationBarTitleText: '表情符号生成器'
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUpdating) {
            const { currentOperatingLevel } = nextProps
            const ctx = wx.createCanvasContext(`level_${currentOperatingLevel}`)
            ctx.draw()
            switch (currentOperatingLevel) {
                case 1:
                    centralizedDraw(ctx, nextProps.level1List)
                    break
                case 2:
                    centralizedDraw(ctx, nextProps.level2List)
                    break
                case 3:
                    centralizedDraw(ctx, nextProps.level3List)
                    break
                case 4:
                    centralizedDraw(ctx, nextProps.level4List)
                    break
                default:
                    break
            }
            this.props.onUpdateCompleted()
        }
    }

    componentWillMount() {
        const timestamp  = new Date().getTime()
        this.props.onPushSprite(1, {
            id: timestamp,
            x: 36, y: 36,
            w: 128, h: 128,
            path: level_1_04,
            level: 1,
            scale: 1,
            degrees: 0
        })

        const ctx = wx.createCanvasContext(`level_1`)
        drawImage(ctx, level_1_04, 36, 36, 128, 128)
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    async onSave() {
        this.setState({
            showLoading: true
        })
        const ctx = wx.createCanvasContext('level_save')
        await asyncCentralizedDraw(ctx, [
            ...this.props.level1List,
            ...this.props.level2List,
            ...this.props.level3List,
            ...this.props.level4List
        ])
        const tempFilePath = await canvasToTempFilePath('level_save')
        saveImageToPhotosAlbum(tempFilePath)
        this.setState({
            showLoading: false
        })
    }

    // async onSave2() {
    //     const levelSaveImgData = await canvasGetImageData('level_1', 0, 0, 200, 200)
    //     const level2ImageDate = await canvasGetImageData('level_2', 0, 0, 200, 200)
    //     const level3ImageDate = await canvasGetImageData('level_3', 0, 0, 200, 200)
    //     const level4ImageDate = await canvasGetImageData('level_4', 0, 0, 200, 200)
    //     mergeImgData(levelSaveImgData, level2ImageDate)
    //     mergeImgData(levelSaveImgData, level3ImageDate)
    //     mergeImgData(levelSaveImgData, level4ImageDate)
    //     await canvasPutImageData('level_save', 0, 0, 200, 200, levelSaveImgData)
    //     const tempFilePath = await canvasToTempFilePath('level_save')
    //     saveImageToPhotosAlbum(tempFilePath)
    // }

    render() {
        const { showLoading } = this.state
        return (
            <View className='index'>
                <View className='canvas-container'>
                    <Canvas
                        canvasId='level_save'
                        disableScroll
                        style='width: 200px; height: 200px;'
                    />
                    <Canvas
                        canvasId='level_1'
                        disableScroll
                        style='width: 200px; height: 200px;'
                    />
                    <Canvas
                        canvasId='level_2'
                        disableScroll
                        style='width: 200px; height: 200px;'
                    />
                    <Canvas
                        canvasId='level_3'
                        disableScroll
                        style='width: 200px; height: 200px;'
                    />
                    <Canvas
                        canvasId='level_4'
                        disableScroll
                        style='width: 200px; height: 200px;'
                    />
                </View>
                {
                    showLoading &&
                    <AtActivityIndicator 
                        className='loading'
                        content='处理中...'
                    />
                }
                {
                    !showLoading &&
                    <View
                        className='save'
                        onClick={this.onSave}
                    >
                        保存
                    </View>
                }
                <SelectBox />
                <LevelSpriteList />
                <SpriteProperty />
            
                <View className='bottom-btn'>
                    <Button 
                        className='contact-button'
                        openType='contact'
                    >
                        意见反馈
                    </Button>
                    <Text className='iconfont icon-vertical_line' style='font-size: 20px;'></Text>
                    <Button 
                        className='share-button'
                        openType='share'
                    >
                        推荐好友
                    </Button>
                </View>
            </View>
        )
    }

    onShareAppMessage() {
        return {
            path: '/pages/index/index',
            title: '表情符号生成器',
            imageUrl: '',
            success: res => { },
            fail: err => { }
        }
    }
}

export default Index
