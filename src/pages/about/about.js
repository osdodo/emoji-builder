import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Layout from '../../components/layout/Layout'

import './about.css'
import '../../iconfont.css'

class About extends Component {
    render() {
        return (
            <Layout title='关于' showGoBack={true}>
                <View className='about'>
                    <View className='container'>
                        <Text class='planet left'></Text>
                        <Text className='iconfont icon-bird' style='font-size: 18px;'></Text>
                        <Text class='planet right'></Text>
                        <Text>欢迎来到真实的荒漠</Text>
                    </View>
                    <View className='info'>一只向往自由的小鸟</View>
                    <View className='info'>GitHub/博客/微博/知乎：喝牛奶的鸵鸟</View>
                    <View className='info'>联系方式：anpengsong@protonmail.com</View>
                </View>
            </Layout>
        )
    }
}

export default About
