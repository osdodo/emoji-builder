import React, { useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import ActionSheet from '../actionSheet/ActionSheet';

import { useSetRecoilState, useRecoilValue } from 'recoil';
import { actionSheetState, statusBarState } from '../../store/atom';

import './Navigation.css';
import '../../iconfont.css';

const Navigation = ({
    title,
    showGoBack = false,
}: {
    title: string;
    showGoBack?: boolean;
}) => {
    const statusBar = useRecoilValue(statusBarState);
    const setActionSheet = useSetRecoilState(actionSheetState);

    const handleClickGoBack = useCallback(() => {
        Taro.navigateBack({
            delta: 1,
        });
    }, []);

    const handleOpenActionSheet = useCallback(() => {
        setActionSheet({ showActionSheet: true });
    }, []);

    const { statusBarHeight } = statusBar;

    return (
        <View>
            <View className="navigation">
                <View style={`height:${statusBarHeight}px`}></View>
                <View className="navigation__title">{title}</View>
                <View className="navigation__tool">
                    {showGoBack ? (
                        <Text
                            className="iconfont icon-comeback"
                            style="font-size: 20px;"
                            onClick={handleClickGoBack}
                        />
                    ) : (
                        <Text
                            className="iconfont icon-setting"
                            style="font-size: 20px;"
                            onClick={handleOpenActionSheet}
                        />
                    )}
                </View>
            </View>
            <View style={`height:${statusBarHeight + 50}px;`}></View>
            <ActionSheet />
        </View>
    );
};

export default Navigation;
