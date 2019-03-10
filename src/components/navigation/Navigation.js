import { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ActionSheet from '../actionSheet/ActionSheet'
import { connect } from '@tarojs/redux'
import { openNavActionSheet } from '../../actions/navigation'

import './Navigation.css'
import '../../iconfont.css'

@connect(({ navigation }) => navigation, (dispatch) => ({
    openNavActionSheet() {
        dispatch(openNavActionSheet())
    },
}))
export default class extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        const { statusBarHeight } = this.props
        return (
            <View>
                <View className='navigation'>
                    <View style={`height:${statusBarHeight}px`}></View>
                    <View className='navigation__title'>{this.props.title}</View>
                    <View className='navigation__tool'>
                        <Text 
                            className='iconfont icon-shezhi' 
                            style='font-size: 22px;' 
                            onClick={this.props.openNavActionSheet}
                        >
                        </Text>
                    </View>
                    <ActionSheet statusBarHeight={statusBarHeight}/>
                </View>
                <View style={`height:${statusBarHeight + 50}px`}></View>
            </View>
        )
    }
}
