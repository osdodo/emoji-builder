import React, { useCallback, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView, Image } from '@tarojs/components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
    currentSelectedLayerState,
    spriteState,
    currentOperatingLayerState,
    isDrawingState,
} from '../../store/atom';

import { checkFlip, drawImage } from '../../utils/helper';
import loadSprites from '../../utils/loadSprites';
import { drawLayerBasePrefix } from '../../config';

import './SpriteList.css';

const sprites = loadSprites();

const SpriteList = () => {
    const [currentSelectedLayer, setCurrentSelectedLayer] = useRecoilState(
        currentSelectedLayerState
    );
    const [sprite, setSprite] = useRecoilState(spriteState);
    const setIsDrawing = useSetRecoilState(isDrawingState);
    const setCurrentOperatingLayer = useSetRecoilState(
        currentOperatingLayerState
    );

    useEffect(() => {
        const ctx = Taro.createCanvasContext(`${drawLayerBasePrefix}1`);
        const _sprite = {
            id: `${new Date().getTime()}`,
            path: sprites[0].imgs[3],
            layer: 1,
            x: 36,
            y: 36,
            w: 128,
            h: 128,
            scale: 1,
            degrees: 0,
            isFlip: false,
        };

        drawImage(ctx, _sprite);

        setSprite(old => {
            return {
                ...old,
                layer1: [_sprite],
            };
        });
        setCurrentOperatingLayer(1);
        setIsDrawing(true);
    }, []);

    const handleLayerChange = useCallback(
        layer => {
            if (currentSelectedLayer === layer) {
                return;
            }
            setCurrentSelectedLayer(layer);
        },
        [currentSelectedLayer]
    );

    const handleClickImg = useCallback(
        path => {
            const { layer2, layer4 } = sprite;
            const ctx = Taro.createCanvasContext(
                `${drawLayerBasePrefix}${currentSelectedLayer}`
            );
            const x = 36;
            const y = 36;
            const w = 128;
            const h = 128;
            const scale = 1;
            const degrees = 0;
            const isFlip = checkFlip(
                {
                    '2': layer2,
                    '4': layer4,
                }[currentSelectedLayer] || [],
                path
            );

            const _sprite = {
                id: `${new Date().getTime()}`,
                path,
                layer: currentSelectedLayer,
                x,
                y,
                w,
                h,
                scale,
                degrees,
                isFlip,
            };

            drawImage(ctx, _sprite);

            setSprite(old => {
                const id = `layer${currentSelectedLayer}`;
                return {
                    ...old,
                    [id]: [...old[id], _sprite],
                };
            });
        },
        [currentSelectedLayer, sprite]
    );

    return (
        <View>
            <ScrollView
                className="select-bar"
                scrollX
                scrollWithAnimation
                lowerThreshold={20}
                upperThreshold={20}
            >
                <View className="select-bar__option">
                    {sprites.map(item => {
                        return (
                            <View
                                className="option__item"
                                key={String(item.layer)}
                                style={
                                    currentSelectedLayer == item.layer
                                        ? 'background: #ffffff; color: #fc1600;'
                                        : ''
                                }
                                onClick={() => handleLayerChange(item.layer)}
                            >
                                {item.text}
                            </View>
                        );
                    })}
                    <View className="option__item">没有了:(</View>
                </View>
            </ScrollView>
            <ScrollView className="select-box" scrollY scrollWithAnimation>
                <View className="sprites-box">
                    {sprites[currentSelectedLayer - 1].imgs.map(item => {
                        return (
                            <Image
                                className="sprites-box__item"
                                src={item}
                                onClick={() => handleClickImg(item)}
                                key={item}
                            />
                        );
                    })}
                    <View className="sprites-box__item">
                        <View className="sprites-box__item__text">
                            没有了:(
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default SpriteList;
