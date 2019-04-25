import Taro, { Component } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import Layout from '../../components/layout/Layout'
import Sprites from '../../components/sprites/Sprites'
import SelectedSprites from '../../components/selectedSprites/SelectedSprites'
import PropertyPanel from '../../components/propertyPanel/PropertyPanel'

import { connect } from '@tarojs/redux'
import { pushSprite, updateCompleted } from '../../actions/setting'
import { setStatusBarHeight } from '../../actions/navigation'

import {
    centralizedDraw,
    canvasToTempFilePath, 
    saveImageToPhotosAlbum,
    cleanCanvas
} from '../../utils/wx-tool'
import { saveLayerId, drawLayerBasePrefix, canvasList } from '../../canvas-config'

import { AtActivityIndicator } from 'taro-ui'
import 'taro-ui/dist/style/components/activity-indicator.scss'
import 'taro-ui/dist/style/components/loading.scss'

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

    componentWillMount() {
        Taro.getSystemInfo({
            success: res => {
                this.props.setStatusBarHeight(res.statusBarHeight)
            },
            fail: err => { }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUpdating) {
            const { currentOperatingLayer } = nextProps
            const ctx = Taro.createCanvasContext(`${drawLayerBasePrefix}${currentOperatingLayer}`)
            ctx.draw()
            centralizedDraw(ctx, nextProps[`layer${currentOperatingLayer}List`])
            this.props.onUpdateCompleted()
        }
    }
    
    handleClickSave() {
        this.setState({
            showLoading: true
        })
        const ctx = Taro.createCanvasContext(saveLayerId)
        centralizedDraw(ctx, [
            ...this.props.layer1List,
            ...this.props.layer2List,
            ...this.props.layer3List,
            ...this.props.layer4List
        ])
        canvasToTempFilePath(saveLayerId)
            .then(tempFilePath => {
                saveImageToPhotosAlbum(tempFilePath)
                    .then(() => {
                        cleanCanvas(saveLayerId)
                        this.setState({
                            showLoading: false
                        })
                    })
                    .catch(err => {
                        this.setState({
                            showLoading: false
                        })
                    })
            })
            .catch(err => {
                this.setState({
                    showLoading: false
                })
            })
    }

    render() {
        const { showLoading } = this.state
        return (
            <Layout title='表情符号生成器'>
                <View className='index'>
                    <View className='canvas-container'>
                        {
                            canvasList.map(item => 
                                <Canvas 
                                    key={item.canvasId}
                                    canvasId={item.canvasId} 
                                    disableScroll
                                    style='width: 200px; height: 200px;'
                                />
                            )
                        }
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
                                onClick={this.handleClickSave}
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
