import { Component } from '@tarojs/taro'
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
    render() {
        const { isOpenedNavActionSheet, statusBarHeight } = this.props
        return (
            <View 
                className='overlay' 
                onClick={this.props.handleClickOverlay} 
                style={isOpenedNavActionSheet ? '' : 'visibility:hidden;'}
            >
                <View 
                    className='rectangle' 
                    style={`top:${statusBarHeight + 50}px`}
                >
                    <View className='triangle-up'></View>
                    <Button 
                        className='action-item'
                        hoverClass='none'
                        open-type='contact'
                    >
                        <Text className='iconfont icon-jianyifankui' style='font-size: 18px;'></Text>
                        <Text className='action-item__text'>建议反馈</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

export default ActionSheet
