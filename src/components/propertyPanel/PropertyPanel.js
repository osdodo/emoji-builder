import { Component } from '@tarojs/taro'
import { View, Text, Slider } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { transformSprite, closeSpriteSetting } from '../../actions/setting'

import './PropertyPanel.css'
import '../../iconfont.css'

@connect(
    ({ setting: { isSettingProperty, currentSettingSprite } }) => ({
        isSettingProperty,
        currentSettingSprite
    }),
    dispatch => ({
        transformSprite(sprite) {
            dispatch(transformSprite(sprite))
        },
        handleCloseSpriteSetting() {
            dispatch(closeSpriteSetting())
        }
    })
)
class PropertyPanel extends Component {

    onMoveSprite(e) {
        const type = e.target.dataset.type
        const { currentSettingSprite } = this.props
        let point = {
            x: currentSettingSprite.x,
            y: currentSettingSprite.y
        }
        switch (type) {
            case 'x++':
                point.x++
                break
            case 'x--':
                point.x--
                break
            case 'y++':
                point.y++
                break
            case 'y--':
                point.y--
                break
            default:
                break
        }
        this.props.transformSprite({
            ...currentSettingSprite,
            ...point
        })
    }

    onChangeScale(e) {
        const scale = e.detail.value
        const { currentSettingSprite } = this.props
        this.props.transformSprite({
            ...currentSettingSprite,
            x: Math.round(100 - currentSettingSprite.w * scale / 2),
            y: Math.round(100 - currentSettingSprite.h * scale / 2),
            scale
        })
    }

    onChangeDegrees(e) {
        this.props.transformSprite({
            ...this.props.currentSettingSprite,
            degrees: e.detail.value
        })
    }

    render() {
        const { currentSettingSprite } = this.props
        return (
            <View
                className='sprite-property'
                style={
                    this.props.isSettingProperty
                        ? 'transition: transform 800ms ease 0ms; transform: translateX(0px); transform-origin: 50% 50% 0px;'
                        : `transition: transform 800ms ease 0ms; transform: translateX(-1000px); transform-origin: 50% 50% 0px;`
                }
            >
                <Text
                    className='iconfont icon-close'
                    style='font-size: 30px;'
                    onClick={this.props.handleCloseSpriteSetting}
                >
                </Text>
                <Text
                    className='iconfont icon-setting sprite-property__title'
                    style='font-size: 15px;'
                >
                    属性设置：
                </Text>
                <View className='property-box'>
                    <View
                        className='scale'
                    >
                        <Text
                            className='iconfont icon-zoom'
                            style='font-size: 30px;'
                        >
                        </Text>
                        <Slider
                            className='slider'
                            min='0'
                            max='1'
                            step='0.1'
                            showValue
                            blockSize='17'
                            blockColor='#ffffff'
                            activeColor='#ffffff'
                            value={currentSettingSprite.scale}
                            onChange={this.onChangeScale}
                        />
                    </View>

                    <View
                        className='degrees'
                    >
                        <Text
                            className='iconfont icon-rotate'
                            style='font-size: 30px;'
                        >
                        </Text>
                        <Slider
                            className='slider'
                            min='0'
                            max='360'
                            step='1'
                            showValue
                            blockSize='17'
                            blockColor='#ffffff'
                            activeColor='#ffffff'
                            value={currentSettingSprite.degrees}
                            onChange={this.onChangeDegrees}
                        />
                    </View>

                    <View className='position'>
                        <Text
                            className='position__info'
                        >[x: {currentSettingSprite.x}, y: {currentSettingSprite.y}]</Text>
                        <Text
                            className='iconfont icon-arrow'
                            style='font-size: 30px;'
                            dataType='x--'
                            onClick={this.onMoveSprite}
                        >
                        </Text>
                        <Text
                            className='iconfont icon-arrow'
                            style='font-size: 30px; transform: rotate(180deg);'
                            dataType='x++'
                            onClick={this.onMoveSprite}
                        >
                        </Text>
                        <Text
                            className='iconfont icon-arrow'
                            style='font-size: 30px; transform: rotate(90deg);'
                            dataType='y--'
                            onClick={this.onMoveSprite}
                        >
                        </Text>
                        <Text
                            className='iconfont icon-arrow'
                            style='font-size: 30px; transform: rotate(270deg);'
                            dataType='y++'
                            onClick={this.onMoveSprite}
                        >
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default PropertyPanel
