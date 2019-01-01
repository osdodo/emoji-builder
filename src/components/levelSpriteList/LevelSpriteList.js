import { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { removeSprite, openSpriteSetting } from '../../actions/setting'

import '../../iconfont.css'
import './LevelSpriteList.css'
import hint from '../../images/hint.png'
@connect(
    ({ setting }) => setting,
    dispatch => ({
        onRemoveSprite(e) {
            const level = e.target.dataset.level
            const id = e.target.dataset.id
            dispatch(removeSprite(level, id))
        },
        onOpenSpriteSetting(e) {
            const level = e.target.dataset.level
            const id = e.target.dataset.id
            dispatch(openSpriteSetting(level, id))
        }
    })
)

class LevelSpriteList extends Component {
    
    state = {
        showSettingHint: false
    }

    componentWillMount() {
        try {
            const value = wx.getStorageSync('hideSettingHint')
                if (!value) {
                    this.setState({
                        showSettingHint: true
                    })
                }
        } catch (e) { }
    }

    onClickHint() {
        try {
            wx.setStorageSync('hideSettingHint', true)
            this.setState({
                showSettingHint: false
            })
        } catch (e) { }
    }

    render() {
        const { onRemoveSprite, onOpenSpriteSetting } = this.props
        const currentSettingSpriteId = this.props.currentSettingSprite.id
        return (
            <View
                className='level-sprite-list'
            >
                <ScrollView
                    className='scrollview'
                    scrollX
                    scrollWithAnimation
                >
                    <View
                        className='level__sprites'
                    >
                        {
                            ([
                                ...this.props.level1List,
                                ...this.props.level2List,
                                ...this.props.level3List,
                                ...this.props.level4List
                            ]).map(item => {
                                return <View
                                    className='level__sprites__item'
                                    key={item.id}
                                >
                                    <Image
                                        className='level__sprites__item__image'
                                        src={item.path}
                                        dataLevel={item.level}
                                        dataId={item.id}
                                        onClick={onOpenSpriteSetting}
                                        style={item.id === currentSettingSpriteId ? 'border-bottom: 3px solid #ff8080;' : ''}
                                    />
                                    <Text
                                        className='iconfont icon-shanchu1'
                                        style='font-size: 20px;'
                                        dataLevel={item.level}
                                        dataId={item.id}
                                        onClick={onRemoveSprite}
                                    >
                                    </Text>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
                {
                    this.state.showSettingHint &&  
                    <View
                        className='setting-hint'
                        onClick={this.onClickHint}
                    >
                        <Image className='setting-hint__img' src={hint} />
                        <Text className='setting-hint__text'>点击图片可进一步设置</Text>
                    </View>
                }
            </View>
        )
    }
}

export default LevelSpriteList
