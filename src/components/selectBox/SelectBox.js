import { Component } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { pushSprite, selectedLevelSwitch } from '../../actions/setting'

import {
    drawImage
} from '../../utils/wx-tool'

import './SelectBox.css'

import level_1_01 from '../../images/level1/level_1_01.png'
import level_1_02 from '../../images/level1/level_1_02.png'
import level_1_03 from '../../images/level1/level_1_03.png'
import level_1_04 from '../../images/level1/level_1_04.png'
import level_1_05 from '../../images/level1/level_1_05.png'
import level_1_06 from '../../images/level1/level_1_06.png'
import level_1_07 from '../../images/level1/level_1_07.png'
import level_1_08 from '../../images/level1/level_1_08.png'
import level_1_09 from '../../images/level1/level_1_09.png'
import level_1_10 from '../../images/level1/level_1_10.png'
import level_1_11 from '../../images/level1/level_1_11.png'
import level_1_12 from '../../images/level1/level_1_12.png'


import level_2_01 from '../../images/level2/level_2_01.png'
import level_2_02 from '../../images/level2/level_2_02.png'
import level_2_03 from '../../images/level2/level_2_03.png'
import level_2_04 from '../../images/level2/level_2_04.png'
import level_2_05 from '../../images/level2/level_2_05.png'
import level_2_06 from '../../images/level2/level_2_06.png'
import level_2_07 from '../../images/level2/level_2_07.png'
import level_2_08 from '../../images/level2/level_2_08.png'
import level_2_09 from '../../images/level2/level_2_09.png'
import level_2_10 from '../../images/level2/level_2_10.png'
import level_2_11 from '../../images/level2/level_2_11.png'
import level_2_12 from '../../images/level2/level_2_12.png'


import level_3_01 from '../../images/level3/level_3_01.png'
import level_3_02 from '../../images/level3/level_3_02.png'
import level_3_03 from '../../images/level3/level_3_03.png'
import level_3_04 from '../../images/level3/level_3_04.png'
import level_3_05 from '../../images/level3/level_3_05.png'
import level_3_06 from '../../images/level3/level_3_06.png'
import level_3_07 from '../../images/level3/level_3_07.png'
import level_3_08 from '../../images/level3/level_3_08.png'
import level_3_09 from '../../images/level3/level_3_09.png'
import level_3_10 from '../../images/level3/level_3_10.png'
import level_3_11 from '../../images/level3/level_3_11.png'
import level_3_12 from '../../images/level3/level_3_12.png'
import level_3_13 from '../../images/level3/level_3_13.png'
import level_3_14 from '../../images/level3/level_3_14.png'
import level_3_15 from '../../images/level3/level_3_15.png'
import level_3_16 from '../../images/level3/level_3_16.png'
import level_3_17 from '../../images/level3/level_3_17.png'


import level_4_01 from '../../images/level4/level_4_01.png'
import level_4_02 from '../../images/level4/level_4_02.png'
import level_4_03 from '../../images/level4/level_4_03.png'
import level_4_04 from '../../images/level4/level_4_04.png'
import level_4_05 from '../../images/level4/level_4_05.png'
import level_4_06 from '../../images/level4/level_4_06.png'
import level_4_07 from '../../images/level4/level_4_07.png'
import level_4_08 from '../../images/level4/level_4_08.png'
import level_4_09 from '../../images/level4/level_4_09.png'
import level_4_10 from '../../images/level4/level_4_10.png'
import level_4_11 from '../../images/level4/level_4_11.png'
import level_4_12 from '../../images/level4/level_4_12.png'
import level_4_13 from '../../images/level4/level_4_13.png'
import level_4_14 from '../../images/level4/level_4_14.png'
import level_4_15 from '../../images/level4/level_4_15.png'
import level_4_16 from '../../images/level4/level_4_16.png'
import level_4_17 from '../../images/level4/level_4_17.png'
import level_4_18 from '../../images/level4/level_4_18.png'
import level_4_19 from '../../images/level4/level_4_19.png'
import level_4_20 from '../../images/level4/level_4_20.png'
import level_4_21 from '../../images/level4/level_4_21.png'


@connect(
    ({ setting: { currentSelectedLevel, level2List, level4List} }) => ({
        currentSelectedLevel, 
        level2ListLen: level2List.length,
        level4ListLen: level4List.length
    }),
    dispatch => ({
        onSelectedLevelSwitch(selectedLevel) {
            dispatch(selectedLevelSwitch(selectedLevel))
        },
        onPushSprite(level, sprite) {
            dispatch(pushSprite(level, sprite))
        },
    })
)

class SelectBox extends Component {
    state = {
        selectBox: [
            {
                level: 1,
                text: '脸',
                sprites: [
                    level_1_01,
                    level_1_02,
                    level_1_03,
                    level_1_04,
                    level_1_05,
                    level_1_06,
                    level_1_07,
                    level_1_08,
                    level_1_09,
                    level_1_10,
                    level_1_11,
                    level_1_12,
                ],
            },
            {
                level: 2,
                text: '眼睛',
                sprites: [
                    level_2_01,
                    level_2_02,
                    level_2_03,
                    level_2_04,
                    level_2_05,
                    level_2_06,
                    level_2_07,
                    level_2_08,
                    level_2_09,
                    level_2_10,
                    level_2_11,
                    level_2_12,
                ],
            },
            {
                level: 3,
                text: '嘴',
                sprites: [
                    level_3_01,
                    level_3_02,
                    level_3_03,
                    level_3_04,
                    level_3_05,
                    level_3_06,
                    level_3_07,
                    level_3_08,
                    level_3_09,
                    level_3_10,
                    level_3_11,
                    level_3_12,
                    level_3_13,
                    level_3_14,
                    level_3_15,
                    level_3_16,
                    level_3_17,
                ],
            },
            {
                level: 4,
                text: '装饰品',
                sprites: [
                    level_4_01,
                    level_4_02,
                    level_4_03,
                    level_4_04,
                    level_4_05,
                    level_4_06,
                    level_4_07,
                    level_4_08,
                    level_4_09,
                    level_4_10,
                    level_4_11,
                    level_4_12,
                    level_4_13,
                    level_4_14,
                    level_4_15,
                    level_4_16,
                    level_4_17,
                    level_4_18,
                    level_4_19,
                    level_4_20,
                    level_4_21,
                ],
            },
        ]
    }
   
    onLevelChange(e) {
        const level = e.target.dataset.level
        if (this.props.currentSelectedLevel == level) {
            return
        }
        this.props.onSelectedLevelSwitch(level)
    }

    onClickImg(e) {
        const timestamp  = new Date().getTime()
        const image = e.target.dataset.image
        const { currentSelectedLevel, level2ListLen, level4ListLen } = this.props
        const ctx = wx.createCanvasContext(`level_${currentSelectedLevel}`)

        let x = 36 
        let y = 36 
        let w = 128
        let h = 128
        let scale = 1
        let degrees = 0
        let isFlip = false
        if ((currentSelectedLevel === 2 && (level2ListLen + 1) % 2 === 0) ||
            (currentSelectedLevel === 4 && (level4ListLen + 1) % 2 === 0)) {
            isFlip = true
            //x = 200 - 128 - 36  //canvas width - w - x
        }
       
        drawImage(ctx, image, x, y, w, h, scale, degrees, isFlip)
        this.props.onPushSprite(currentSelectedLevel, {
            id: timestamp,
            path: image,
            level: currentSelectedLevel,
            x, y,
            w, h,
            scale,
            degrees,
            isFlip
        })
    }

    render() {
        const { currentSelectedLevel } = this.props
        const { selectBox } = this.state

        return (
            <View className='select-container'>
                <ScrollView
                    className='scrollview1'
                    scrollX
                    scrollWithAnimation
                    lowerThreshold='20'
                    upperThreshold='20'
                >
                    <View className='option'>
                        {
                            selectBox.map(item => {
                                return <View
                                    className='option__item'
                                    key={String(item.level)}
                                    style={currentSelectedLevel == item.level ? 'background: #ffffff; color: #ff8080;' : ''}
                                    dataLevel={item.level}
                                    onClick={this.onLevelChange}
                                >
                                    {item.text}
                                </View>
                            })
                        }
                        <View className='option__item'>坐等更新</View>
                    </View>
                </ScrollView>
                <ScrollView
                    className='scrollview2'
                    scrollX
                    scrollWithAnimation
                >
                    <View
                        className='sprites-box'
                    >
                        {
                            selectBox[currentSelectedLevel - 1].sprites.map(item => {
                                return <View
                                    className='sprites-box__item'
                                    key={item}
                                >
                                    <Image
                                        className='sprites-box__item__image'
                                        src={item}
                                        dataImage={item}
                                        onClick={this.onClickImg}
                                    />
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default SelectBox
