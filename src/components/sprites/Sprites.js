import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { pushSprite, selectedLayerSwitch } from '../../actions/setting'

import { drawImage } from '../../utils/wx-tool'
import { drawLayerBasePrefix } from '../../canvas-config'

import './Sprites.css'

import layer_1_01 from '../../images/layer1/layer_1_01.png'
import layer_1_02 from '../../images/layer1/layer_1_02.png'
import layer_1_03 from '../../images/layer1/layer_1_03.png'
import layer_1_04 from '../../images/layer1/layer_1_04.png'
import layer_1_05 from '../../images/layer1/layer_1_05.png'
import layer_1_06 from '../../images/layer1/layer_1_06.png'
import layer_1_07 from '../../images/layer1/layer_1_07.png'
import layer_1_08 from '../../images/layer1/layer_1_08.png'
import layer_1_09 from '../../images/layer1/layer_1_09.png'
import layer_1_10 from '../../images/layer1/layer_1_10.png'
import layer_1_11 from '../../images/layer1/layer_1_11.png'
import layer_1_12 from '../../images/layer1/layer_1_12.png'


import layer_2_01 from '../../images/layer2/layer_2_01.png'
import layer_2_02 from '../../images/layer2/layer_2_02.png'
import layer_2_03 from '../../images/layer2/layer_2_03.png'
import layer_2_04 from '../../images/layer2/layer_2_04.png'
import layer_2_05 from '../../images/layer2/layer_2_05.png'
import layer_2_06 from '../../images/layer2/layer_2_06.png'
import layer_2_07 from '../../images/layer2/layer_2_07.png'
import layer_2_08 from '../../images/layer2/layer_2_08.png'
import layer_2_09 from '../../images/layer2/layer_2_09.png'
import layer_2_10 from '../../images/layer2/layer_2_10.png'
import layer_2_11 from '../../images/layer2/layer_2_11.png'
import layer_2_12 from '../../images/layer2/layer_2_12.png'


import layer_3_01 from '../../images/layer3/layer_3_01.png'
import layer_3_02 from '../../images/layer3/layer_3_02.png'
import layer_3_03 from '../../images/layer3/layer_3_03.png'
import layer_3_04 from '../../images/layer3/layer_3_04.png'
import layer_3_05 from '../../images/layer3/layer_3_05.png'
import layer_3_06 from '../../images/layer3/layer_3_06.png'
import layer_3_07 from '../../images/layer3/layer_3_07.png'
import layer_3_08 from '../../images/layer3/layer_3_08.png'
import layer_3_09 from '../../images/layer3/layer_3_09.png'
import layer_3_10 from '../../images/layer3/layer_3_10.png'
import layer_3_11 from '../../images/layer3/layer_3_11.png'
import layer_3_12 from '../../images/layer3/layer_3_12.png'
import layer_3_13 from '../../images/layer3/layer_3_13.png'
import layer_3_14 from '../../images/layer3/layer_3_14.png'
import layer_3_15 from '../../images/layer3/layer_3_15.png'
import layer_3_16 from '../../images/layer3/layer_3_16.png'
import layer_3_17 from '../../images/layer3/layer_3_17.png'


import layer_4_01 from '../../images/layer4/layer_4_01.png'
import layer_4_02 from '../../images/layer4/layer_4_02.png'
import layer_4_03 from '../../images/layer4/layer_4_03.png'
import layer_4_04 from '../../images/layer4/layer_4_04.png'
import layer_4_05 from '../../images/layer4/layer_4_05.png'
import layer_4_06 from '../../images/layer4/layer_4_06.png'
import layer_4_07 from '../../images/layer4/layer_4_07.png'
import layer_4_08 from '../../images/layer4/layer_4_08.png'
import layer_4_09 from '../../images/layer4/layer_4_09.png'
import layer_4_10 from '../../images/layer4/layer_4_10.png'
import layer_4_11 from '../../images/layer4/layer_4_11.png'
import layer_4_12 from '../../images/layer4/layer_4_12.png'
import layer_4_13 from '../../images/layer4/layer_4_13.png'
import layer_4_14 from '../../images/layer4/layer_4_14.png'
import layer_4_15 from '../../images/layer4/layer_4_15.png'
import layer_4_16 from '../../images/layer4/layer_4_16.png'
import layer_4_17 from '../../images/layer4/layer_4_17.png'
import layer_4_18 from '../../images/layer4/layer_4_18.png'
import layer_4_19 from '../../images/layer4/layer_4_19.png'
import layer_4_20 from '../../images/layer4/layer_4_20.png'
import layer_4_21 from '../../images/layer4/layer_4_21.png'

@connect(
    ({ setting: { currentSelectedLayer, layer2List, layer4List} }) => ({
        currentSelectedLayer,
        layer2List,
        layer4List
    }),
    dispatch => ({
        selectedLayerSwitch(selectedLayer) {
            dispatch(selectedLayerSwitch(selectedLayer))
        },
        pushSprite(layer, sprite) {
            dispatch(pushSprite(layer, sprite))
        },
    })
)
class Sprites extends Component {
    state = {
        sprites: [
            {
                layer: 1,
                text: '脸',
                imgs: [
                    layer_1_01,
                    layer_1_02,
                    layer_1_03,
                    layer_1_04,
                    layer_1_05,
                    layer_1_06,
                    layer_1_07,
                    layer_1_08,
                    layer_1_09,
                    layer_1_10,
                    layer_1_11,
                    layer_1_12,
                ],
            },
            {
                layer: 2,
                text: '眼睛',
                imgs: [
                    layer_2_01,
                    layer_2_02,
                    layer_2_03,
                    layer_2_04,
                    layer_2_05,
                    layer_2_06,
                    layer_2_07,
                    layer_2_08,
                    layer_2_09,
                    layer_2_10,
                    layer_2_11,
                    layer_2_12,
                ],
            },
            {
                layer: 3,
                text: '嘴',
                imgs: [
                    layer_3_01,
                    layer_3_02,
                    layer_3_03,
                    layer_3_04,
                    layer_3_05,
                    layer_3_06,
                    layer_3_07,
                    layer_3_08,
                    layer_3_09,
                    layer_3_10,
                    layer_3_11,
                    layer_3_12,
                    layer_3_13,
                    layer_3_14,
                    layer_3_15,
                    layer_3_16,
                    layer_3_17,
                ],
            },
            {
                layer: 4,
                text: '装饰品',
                imgs: [
                    layer_4_01,
                    layer_4_02,
                    layer_4_03,
                    layer_4_04,
                    layer_4_05,
                    layer_4_06,
                    layer_4_07,
                    layer_4_08,
                    layer_4_09,
                    layer_4_10,
                    layer_4_11,
                    layer_4_12,
                    layer_4_13,
                    layer_4_14,
                    layer_4_15,
                    layer_4_16,
                    layer_4_17,
                    layer_4_18,
                    layer_4_19,
                    layer_4_20,
                    layer_4_21,
                ],
            },
        ]
    }

    componentDidMount() {
       this.defaultDraw()
    }

    defaultDraw = () => {
        const ctx = wx.createCanvasContext(`${drawLayerBasePrefix}1`)
        drawImage(ctx, layer_1_04, 36, 36, 128, 128, 1, 0, false)
        this.props.pushSprite(1, {
            id: `${new Date().getTime()}`,
            path: layer_1_04,
            layer: 1,
            x: 36, y: 36,
            w: 128, h: 128,
            scale: 1,
            degrees: 0,
            isFlip: false
        })
    }

    handleLayerChange(e) {
        const layer = e.target.dataset.layer
        if (this.props.currentSelectedLayer == layer) {
            return
        }
        this.props.selectedLayerSwitch(layer)
    }

    checkFlip = (spriteListsObj, currentSelectedLayer, path) => {
        const spriteList = spriteListsObj[`${currentSelectedLayer}`] || []
        for (let i = 0, len = spriteList.length; i < len; i++) {
            if (spriteList[i].path === path) {
                return true
            }
        }
        return false
    }

    handleClickImg(e) {
        const { currentSelectedLayer, layer2List, layer4List } = this.props
        const image = e.target.dataset.image
        const ctx = Taro.createCanvasContext(`${drawLayerBasePrefix}${currentSelectedLayer}`)
        const x = 36
        const y = 36
        const w = 128
        const h = 128
        const scale = 1
        const degrees = 0
        const isFlip = this.checkFlip(
            {
                '2': layer2List,
                '4': layer4List
            },
            currentSelectedLayer,
            image
        )

        drawImage(ctx, image, x, y, w, h, scale, degrees, isFlip)
        this.props.pushSprite(currentSelectedLayer, {
            id: `${new Date().getTime()}`,
            path: image,
            layer: currentSelectedLayer,
            x, y,
            w, h,
            scale,
            degrees,
            isFlip
        })
    }

    render() {
        const { currentSelectedLayer } = this.props
        const { sprites } = this.state

        return (
            <View>
                <ScrollView
                    className='select-bar'
                    scrollX
                    scrollWithAnimation
                    lowerThreshold='20'
                    upperThreshold='20'
                >
                    <View className='select-bar__option'>
                        {
                            sprites.map(item => {
                                return (
                                    <View
                                        className='option__item'
                                        key={String(item.layer)}
                                        style={currentSelectedLayer == item.layer ? 'background: #ffffff; color: #fc1600;' : ''}
                                        dataLayer={item.layer}
                                        onClick={this.handleLayerChange}
                                    >
                                        {item.text}
                                    </View>
                                )
                            })
                        }
                        <View className='option__item'>没有了:(</View>
                    </View>
                </ScrollView>
                <ScrollView
                    className='select-box'
                    scrollY
                    scrollWithAnimation
                >
                    <View
                        className='sprites-box'
                    >
                        {
                            sprites[currentSelectedLayer - 1].imgs.map(item => {
                                return (
                                    <Image
                                        className='sprites-box__item'
                                        src={item}
                                        dataImage={item}
                                        onClick={this.handleClickImg}
                                        key={item}
                                    />
                                )
                            })
                        }
                        <View className='sprites-box__item'>
                            <Text className='sprites-box__item__text'>没有了:(</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Sprites
