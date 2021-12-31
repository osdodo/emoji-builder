import React from 'react';
import { View } from '@tarojs/components';
import Navigation from '../Navigation/Navigation';

const Layout = ({
    title,
    showGoBack,
    children,
}: {
    title: string;
    showGoBack?: boolean;
    children: JSX.Element;
}) => {
    return (
        <View className="page" id="page">
            <Navigation title={title} showGoBack={showGoBack} />
            {children}
        </View>
    );
};

export default Layout;
