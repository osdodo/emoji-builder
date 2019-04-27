import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import { connect } from '@tarojs/redux'
import { closeNavActionSheet } from '../../actions/navigation'

import './ActionSheet.css'
import '../../iconfont.css'

@connect(({ navigation }) => navigation, (dispatch) => ({
    handleClickOverlay() {
        dispatch(closeNavActionSheet())
    },
}))
class ActionSheet extends Component {

    shouldComponentUpdate() {
        return false
    }
    
    handleClickGoAbout = () => {
        Taro.navigateTo({
            url: '/pages/about/about'
        })
    }

    render() {
        const { isOpenedNavActionSheet, statusBarHeight } = this.props
        return (
            <View>
                {
                    isOpenedNavActionSheet && 
                    <View 
                        className='overlay' 
                        onClick={this.props.handleClickOverlay} 
                    >
                        <View 
                            className='rectangle' 
                            style={`top:${statusBarHeight + 50}px`}
                        >
                            <View className='triangle-up'></View>
                            <Button 
                                className='action-item' 
                                hoverClass='none'
                                openType='share'
                            >
                                <Text className='iconfont icon-share' style='font-size: 18px;'></Text>
                                <Text className='action-item__text'>分享给好友</Text>
                            </Button>
                            <Button 
                                className='action-item'
                                hoverClass='none'
                                open-type='contact'
                            >
                                <Text className='iconfont icon-feedback' style='font-size: 18px;'></Text>
                                <Text className='action-item__text'>建议反馈</Text>
                            </Button>
                            <Button 
                                className='action-item'
                                hoverClass='none'
                                onClick={this.handleClickGoAbout}
                            >
                                <Text className='iconfont icon-about' style='font-size: 18px;'></Text>
                                <Text className='action-item__text'>关于</Text>
                            </Button>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

export default ActionSheet
