import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import Layout from '../../components/layout/Layout'
import Sprites from '../../components/sprites/Sprites'
import SelectedSprites from '../../components/selectedSprites/SelectedSprites'
import PropertyPanel from '../../components/propertyPanel/PropertyPanel'
import { connect } from '@tarojs/redux'
import { pushSprite, updateCompleted } from '../../actions/setting'
import { setStatusBarHeight } from '../../actions/navigation'
import {
    centralizedDraw, asyncCentralizedDraw,
    canvasToTempFilePath, saveImageToPhotosAlbum,
} from '../../utils/wx-tool'

import './index.css'
import '../../iconfont.css'

@connect(({ setting }) => setting,(dispatch) => ({
    onPushSprite(layer, sprite) {
        dispatch(pushSprite(layer, sprite))
    },
    onUpdateCompleted() {
        dispatch(updateCompleted())
    },
    setStatusBarHeight(val) {
        dispatch(setStatusBarHeight(val))
    }
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
            const { currentOperatingLayer } = nextProps
            const ctx = wx.createCanvasContext(`layer_${currentOperatingLayer}`)
            ctx.draw()
            switch (currentOperatingLayer) {
                case 1:
                    centralizedDraw(ctx, nextProps.layer1List)
                    break
                case 2:
                    centralizedDraw(ctx, nextProps.layer2List)
                    break
                case 3:
                    centralizedDraw(ctx, nextProps.layer3List)
                    break
                case 4:
                    centralizedDraw(ctx, nextProps.layer4List)
                    break
                default:
                    break
            }
            this.props.onUpdateCompleted()
        }
    }

    componentWillMount() {
        Taro.getSystemInfo({
            success: res => {
                this.props.setStatusBarHeight(res.statusBarHeight)
            },
            fail: err => { }
        })
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    async onSave() {
        this.setState({
            showLoading: true
        })
        const ctx = wx.createCanvasContext('layer_save')
        await asyncCentralizedDraw(ctx, [
            ...this.props.layer1List,
            ...this.props.layer2List,
            ...this.props.layer3List,
            ...this.props.layer4List
        ])
        const tempFilePath = await canvasToTempFilePath('layer_save')
        saveImageToPhotosAlbum(tempFilePath)
        this.setState({
            showLoading: false
        })
    }

    render() {
        const { showLoading } = this.state
        return (
            <Layout title='表情符号生成器'>
                <View className='index'>
                    <View className='canvas-container'>
                        <Canvas
                            canvasId='layer_save'
                            disableScroll
                            style='width: 200px; height: 200px;'
                        />
                        <Canvas
                            canvasId='layer_1'
                            disableScroll
                            style='width: 200px; height: 200px;'
                        />
                        <Canvas
                            canvasId='layer_2'
                            disableScroll
                            style='width: 200px; height: 200px;'
                        />
                        <Canvas
                            canvasId='layer_3'
                            disableScroll
                            style='width: 200px; height: 200px;'
                        />
                        <Canvas
                            canvasId='layer_4'
                            disableScroll
                            style='width: 200px; height: 200px;'
                        />
                    </View>
                    {
                        showLoading ? 
                            <AtActivityIndicator
                                className='loading'
                                content='处理中...'
                            />
                            : 
                            <View
                                className='save'
                                onClick={this.onSave}
                            >
                                保存
                            </View>
                    }
                </View>
                <Sprites />
                <SelectedSprites />
                <PropertyPanel />
            </Layout>
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
