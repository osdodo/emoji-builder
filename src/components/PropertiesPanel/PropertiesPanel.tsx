import React, { useCallback } from 'react';
import { View, Text, Slider } from '@tarojs/components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    currentOperatingSpriteState,
    showPropertiesPanelState,
    isDrawingState,
    currentOperatingLayerState,
    spriteState,
} from '@/store/atom';
import { updateSpriteList } from '@/utils/helper';
import { Sprite } from '@/types/index';
import './PropertiesPanel.css';
import '../../iconfont.css';

const PropertiesPanel = () => {
    const [showPropertiesPanel, setShowPropertiesPanel] = useRecoilState(
        showPropertiesPanelState
    );
    const [currentOperatingSprite, setCurrentOperatingSprite] = useRecoilState(
        currentOperatingSpriteState
    );
    const setIsDrawing = useSetRecoilState(isDrawingState);
    const setCurrentOperatingLayer = useSetRecoilState(
        currentOperatingLayerState
    );
    const setSprite = useSetRecoilState(spriteState);

    const repaint = (sprite: Sprite) => {
        const currentOperatingLayer = sprite.layer;
        setCurrentOperatingLayer(currentOperatingLayer);
        setCurrentOperatingSprite(sprite);
        setSprite(old => {
            const id = `layer${currentOperatingLayer}`;
            return {
                ...old,
                [id]: updateSpriteList(old[id], sprite),
            };
        });
        setIsDrawing(true);
    };

    const onMoveSprite = useCallback(
        (type: 'right' | 'left' | 'up' | 'down') => {
            if (!currentOperatingSprite) {
                return;
            }

            const point = {
                x: currentOperatingSprite.x,
                y: currentOperatingSprite.y,
            };

            const speed = 5;

            switch (type) {
                case 'right':
                    point.x = point.x + speed;
                    break;
                case 'left':
                    point.x = point.x - speed;
                    break;
                case 'up':
                    point.y = point.y + speed;
                    break;
                case 'down':
                    point.y = point.y - speed;
                    break;
                default:
                    break;
            }

            const _sprite = {
                ...currentOperatingSprite,
                ...point,
            };

            repaint(_sprite);
        },
        [currentOperatingSprite]
    );

    const onChangeScale = useCallback(
        e => {
            if (!currentOperatingSprite) {
                return;
            }

            const scale = e.detail.value;

            const _sprite = {
                ...currentOperatingSprite,
                x: Math.round(100 - (currentOperatingSprite.w * scale) / 2),
                y: Math.round(100 - (currentOperatingSprite.h * scale) / 2),
                scale,
            };

            repaint(_sprite);
        },
        [currentOperatingSprite]
    );

    const onChangeDegrees = useCallback(
        e => {
            if (!currentOperatingSprite) {
                return;
            }

            const _sprite = {
                ...currentOperatingSprite,
                degrees: e.detail.value,
            };

            repaint(_sprite);
        },
        [currentOperatingSprite]
    );

    const handleClosePropertiesPanel = useCallback(() => {
        setShowPropertiesPanel(false);
    }, []);

    if (!currentOperatingSprite) {
        return null;
    }

    return (
        <View
            className="sprite-property"
            style={
                showPropertiesPanel
                    ? 'transition: transform 800ms ease 0ms; transform: translateX(0px); transform-origin: 50% 50% 0px;'
                    : `transition: transform 800ms ease 0ms; transform: translateX(-1000px); transform-origin: 50% 50% 0px;`
            }
        >
            <Text
                className="iconfont icon-close"
                style="font-size: 30px;"
                onClick={handleClosePropertiesPanel}
            />
            <Text
                className="iconfont icon-setting sprite-property__title"
                style="font-size: 15px;"
            >
                属性设置：
            </Text>
            <View className="property-box">
                <View className="scale">
                    <Text
                        className="iconfont icon-zoom"
                        style="font-size: 30px;"
                    />
                    <Slider
                        className="slider"
                        min={0}
                        max={1}
                        step={0.1}
                        showValue
                        blockSize={17}
                        blockColor="#ffffff"
                        activeColor="#ffffff"
                        value={currentOperatingSprite.scale}
                        onChange={onChangeScale}
                    />
                </View>

                <View className="degrees">
                    <Text
                        className="iconfont icon-rotate"
                        style="font-size: 30px;"
                    />
                    <Slider
                        className="slider"
                        min={0}
                        max={360}
                        step={1}
                        showValue
                        blockSize={17}
                        blockColor="#ffffff"
                        activeColor="#ffffff"
                        value={currentOperatingSprite.degrees}
                        onChange={onChangeDegrees}
                    />
                </View>

                <View className="position">
                    <Text className="position__info">
                        [ x: {currentOperatingSprite.x}, y:{' '}
                        {currentOperatingSprite.y}]
                    </Text>
                    <Text
                        className="iconfont icon-arrow"
                        style="font-size: 30px;"
                        onClick={() => onMoveSprite('left')}
                    />
                    <Text
                        className="iconfont icon-arrow"
                        style="font-size: 30px; transform: rotate(180deg);"
                        onClick={() => onMoveSprite('right')}
                    />
                    <Text
                        className="iconfont icon-arrow"
                        style="font-size: 30px; transform: rotate(90deg);"
                        onClick={() => onMoveSprite('down')}
                    />
                    <Text
                        className="iconfont icon-arrow"
                        style="font-size: 30px; transform: rotate(270deg);"
                        onClick={() => onMoveSprite('up')}
                    />
                </View>
            </View>
        </View>
    );
};

export default PropertiesPanel;
