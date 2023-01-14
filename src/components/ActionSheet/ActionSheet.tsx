import React, { useCallback } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { actionSheetState, statusBarState } from '@/store/atom';

import './ActionSheet.css';
import '../../iconfont.css';

const ActionSheet = () => {
    const [actionSheet, setActionSheet] = useRecoilState(actionSheetState);
    const statusBar = useRecoilValue(statusBarState);

    const handleClickOverlay = useCallback(() => {
        setActionSheet({ showActionSheet: false });
    }, []);

    const handleClickGoAbout = useCallback(() => {
        Taro.navigateTo({
            url: '/pages/about/about',
        });
    }, []);

    return (
        <View
            className="overlay"
            onClick={handleClickOverlay}
            style={actionSheet.showActionSheet ? '' : 'display: none;'}
        >
            <View
                className="rectangle"
                style={`top:${statusBar.statusBarHeight + 50}px`}
            >
                <View className="triangle-up"></View>
                <Button
                    className="action-item"
                    hoverClass="none"
                    openType="share"
                >
                    <Text
                        className="iconfont icon-share"
                        style="font-size: 18px;"
                    />
                    <Text className="action-item__text">分享给好友</Text>
                </Button>
                <Button
                    className="action-item"
                    hoverClass="none"
                    open-type="contact"
                >
                    <Text
                        className="iconfont icon-feedback"
                        style="font-size: 18px;"
                    />
                    <Text className="action-item__text">建议反馈</Text>
                </Button>
                <Button
                    className="action-item"
                    hoverClass="none"
                    onClick={handleClickGoAbout}
                >
                    <Text
                        className="iconfont icon-about"
                        style="font-size: 18px;"
                    />
                    <Text className="action-item__text">关于</Text>
                </Button>
            </View>
        </View>
    );
};

export default ActionSheet;
