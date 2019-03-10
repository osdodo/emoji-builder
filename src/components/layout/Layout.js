import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Navigation from '../navigation/Navigation'

export default class extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <View className='page'>
                <Navigation title={this.props.title} />
                {this.props.children}
            </View>
        )
    }
}
