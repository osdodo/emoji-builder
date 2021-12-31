import React, { useEffect, useCallback, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
import SpriteList from '../../components/SpriteList/SpriteList';
import SelectedSpriteList from '../../components/SelectedSpriteList/SelectedSpriteList';
import PropertiesPanel from '../../components/PropertiesPanel/PropertiesPanel';
import Layout from '../../components/Layout/Layout';

import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {
    isDrawingState,
    statusBarState,
    currentOperatingLayerState,
    spriteState,
} from '../../store/atom';

import {
    canvasList,
    canvasW,
    drawLayerBasePrefix,
    saveLayerId,
} from '../../config';
import {
    canvasToTempFilePath,
    centralizedDraw,
    cleanCanvas,
    saveImageToPhotosAlbum,
} from '../../utils/helper';

import { AtActivityIndicator } from 'taro-ui';
import 'taro-ui/dist/style/components/activity-indicator.scss';
import 'taro-ui/dist/style/components/loading.scss';

import './index.css';
import '../../iconfont.css';

const Index = () => {
    const [loading, setLoading] = useState(true);

    const setStatusBar = useSetRecoilState(statusBarState);
    const [isDrawing, setIsDrawing] = useRecoilState(isDrawingState);
    const currentOperatingLayer = useRecoilValue(currentOperatingLayerState);
    const sprite = useRecoilValue(spriteState);

    useEffect(() => {
        Taro.getSystemInfo({
            success: (res) => {
                setStatusBar({
                    statusBarHeight: res.statusBarHeight,
                });
                setLoading(false);
            },
            fail: () => {},
        });
    }, []);

    useEffect(() => {
        if (isDrawing) {
            const ctx = Taro.createCanvasContext(
                `${drawLayerBasePrefix}${currentOperatingLayer}`
            );
            ctx.draw();
            centralizedDraw(ctx, sprite[`layer${currentOperatingLayer}`]);
            setIsDrawing(false);
        }
    }, [isDrawing, currentOperatingLayer, sprite]);

    const handleClickSave = useCallback(() => {
        setLoading(true);

        const ctx = Taro.createCanvasContext(saveLayerId);
        centralizedDraw(ctx, [
            ...sprite.layer1,
            ...sprite.layer2,
            ...sprite.layer3,
            ...sprite.layer4,
        ]);

        canvasToTempFilePath(saveLayerId)
            .then((tempFilePath: string) =>
                saveImageToPhotosAlbum(tempFilePath)
            )
            .then(() => {
                cleanCanvas(saveLayerId);
                setLoading(false);
                Taro.showToast({
                    title: '已保存至相册',
                    icon: 'success',
                    duration: 3000,
                });
            })
            .catch(() => {
                setLoading(false);
                Taro.showToast({
                    title: '保存失败',
                    icon: 'error',
                    duration: 3000,
                });
            });
    }, [sprite]);

    return (
        <Layout title="表情符号生成器">
            <View>
                <View className="top">
                    <View className="canvas-container">
                        {canvasList.map((item) => (
                            <Canvas
                                key={item.canvasId}
                                canvasId={item.canvasId}
                                disableScroll
                                style={`width: ${canvasW}px; height: ${canvasW}px;`}
                            />
                        ))}
                    </View>
                    {loading ? (
                        <AtActivityIndicator
                            className="loading"
                            content="处理中..."
                        />
                    ) : (
                        <View className="save" onClick={handleClickSave}>
                            保存
                        </View>
                    )}
                </View>
                <SpriteList />
                <SelectedSpriteList />
                <PropertiesPanel />
            </View>
        </Layout>
    );
};

export default Index;
