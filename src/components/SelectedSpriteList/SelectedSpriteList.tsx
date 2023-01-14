import React, { useCallback } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
    spriteState,
    currentOperatingSpriteState,
    showPropertiesPanelState,
    currentOperatingLayerState,
    isDrawingState,
} from '@/store/atom';
import { Sprite } from '@/types/index';

import '../../iconfont.css';
import './SelectedSpriteList.css';

const SelectedSpriteList = () => {
    const [sprite, setSprite] = useRecoilState(spriteState);
    const [currentOperatingSprite, setCurrentOperatingSprite] = useRecoilState(
        currentOperatingSpriteState
    );

    const setShowPropertiesPanel = useSetRecoilState(showPropertiesPanelState);
    const setIsDrawing = useSetRecoilState(isDrawingState);
    const setCurrentOperatingLayer = useSetRecoilState(
        currentOperatingLayerState
    );

    const handleOpenPropertiesPanel = useCallback((sprite: Sprite) => {
        setCurrentOperatingSprite(sprite);
        setShowPropertiesPanel(true);
    }, []);

    const handleRemoveSprite = useCallback(
        (spriteId: string, layer: number) => {
            setSprite(old => {
                const id = `layer${layer}`;
                return {
                    ...old,
                    [id]: old[id].filter((item: Sprite) => {
                        return item.id !== spriteId;
                    }),
                };
            });
            setCurrentOperatingLayer(layer);
            setIsDrawing(true);
        },
        []
    );

    const sprites = [
        ...sprite.layer1,
        ...sprite.layer2,
        ...sprite.layer3,
        ...sprite.layer4,
    ];

    return (
        <View className="selected-sprites" id="page">
            {sprites.map(item => {
                return (
                    <View className="selected-sprites__item" key={item.id}>
                        <Image
                            className="selected-sprites__item__image"
                            src={item.path}
                            onClick={() => handleOpenPropertiesPanel(item)}
                            style={
                                item.id === currentOperatingSprite?.id
                                    ? 'border: 1px solid #fc1600;'
                                    : ''
                            }
                        />
                        <Text
                            className="iconfont icon-delete"
                            style="font-size: 20px;"
                            onClick={() =>
                                handleRemoveSprite(item.id, item.layer)
                            }
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default SelectedSpriteList;
