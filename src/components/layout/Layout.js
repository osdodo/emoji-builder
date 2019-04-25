import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Navigation from '../navigation/Navigation'

class Layout extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        return (
            <View className='page' id='page'>
                <Navigation title={this.props.title} />
                {this.props.children}
            </View>
        )
    }
}

export default Layout

