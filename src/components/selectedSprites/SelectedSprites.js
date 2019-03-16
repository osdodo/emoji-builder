import { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { removeSprite, openSpriteSetting } from '../../actions/setting'

import '../../iconfont.css'
import './SelectedSprites.css'

@connect(
    ({ setting }) => setting,
    dispatch => ({
        handleRemoveSprite(e) {
            dispatch(removeSprite(e.target.dataset.layer, e.target.dataset.id))
        },
        handleOpenSpriteSetting(e) {
            dispatch(openSpriteSetting(e.target.dataset.layer, e.target.dataset.id))
        }
    })
)

export default class extends Component {
    render() {
        return (
            <View
                className='selected-sprites'
                id='page'
            >
                {
                    ([
                        ...this.props.layer1List,
                        ...this.props.layer2List,
                        ...this.props.layer3List,
                        ...this.props.layer4List
                    ]).map(item => {
                        return <View
                            className='selected-sprites__item'
                            key={item.id}
                        >
                            <Image
                                className='selected-sprites__item__image'
                                src={item.path}
                                dataLayer={item.layer}
                                dataId={item.id}
                                onClick={this.props.handleOpenSpriteSetting}
                                style={item.id === this.props.currentSettingSprite.id ? 'border-bottom: 3px solid rgb(0,0,0);' : ''}
                            />
                            <Text
                                className='iconfont icon-shanchu1'
                                style='font-size: 20px;'
                                dataLayer={item.layer}
                                dataId={item.id}
                                onClick={this.props.handleRemoveSprite}
                            >
                            </Text>
                        </View>
                    })
                }
            </View>
        )
    }
}
