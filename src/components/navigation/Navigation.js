import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ActionSheet from '../actionSheet/ActionSheet'

import { connect } from '@tarojs/redux'
import { openNavActionSheet } from '../../actions/navigation'

import './Navigation.css'
import '../../iconfont.css'

@connect(({ navigation }) => navigation, (dispatch) => ({
    handleOpenNavActionSheet() {
        dispatch(openNavActionSheet())
    },
}))
class Navigation extends Component {

    static defaultProps = {
        title: '',
        showGoBack: false
    }

    shouldComponentUpdate() {
        return false
    }

    handleClickGoBack = () => {
        Taro.navigateBack({
            delta: 1
        })
    }

    render() {
        const { statusBarHeight } = this.props
        return (
            <View>
                <View className='navigation'>
                    <View style={`height:${statusBarHeight}px`}></View>
                    <View className='navigation__title'>{this.props.title}</View>
                    <View className='navigation__tool'>
                        {
                            this.props.showGoBack
                                ? <Text className='iconfont icon-comeback' style='font-size: 20px;' onClick={this.handleClickGoBack} />
                                : <Text className='iconfont icon-setting' style='font-size: 20px;' onClick={this.props.handleOpenNavActionSheet} />
                        }
                    </View>
                </View>
                <View style={`height:${statusBarHeight + 50}px;`}></View>
                <ActionSheet statusBarHeight={statusBarHeight}/>
            </View>
        )
    }
}

export default Navigation
