import React from 'react';
import { View, Text } from '@tarojs/components';
import Layout from '@/components/Layout/Layout';

import './about.css';
import '../../iconfont.css';

const About = () => {
    return (
        <Layout title="关于" showGoBack={true}>
            <View className="about">
                <View className="container">
                    <Text style="color:#7c7b7b;">喝牛奶的鸵鸟</Text>
                    <Text className="planet left"></Text>
                    <Text
                        className="iconfont icon-bird"
                        style="font-size: 18px;"
                    />
                    <Text className="planet right"></Text>
                    <Text style="color:#7c7b7b;">欢迎来到真实的荒漠</Text>
                </View>
                <View className="info">
                    联系方式：osdodo@qq.com
                </View>
            </View>
        </Layout>
    );
};

export default About;
