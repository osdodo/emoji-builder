import { atom } from 'recoil';
import { Sprite } from '../types';

export const actionSheetState = atom({
    key: 'actionSheetState',
    default: {
        showActionSheet: false,
    },
});

export const statusBarState = atom({
    key: 'statusBarState',
    default: {
        statusBarHeight: 0,
    },
});

export const showPropertiesPanelState = atom({
    key: 'showPropertiesPanelState',
    default: false,
});

export const spriteState = atom<{
    layer1: Sprite[];
    layer2: Sprite[];
    layer3: Sprite[];
    layer4: Sprite[];
}>({
    key: 'spriteState',
    default: {
        layer1: [],
        layer2: [],
        layer3: [],
        layer4: [],
    },
});

export const currentSelectedLayerState = atom({
    key: 'currentSelectedLayerState',
    default: 1,
});

export const currentOperatingLayerState = atom({
    key: 'currentOperatingLayerState',
    default: 0,
});

export const currentOperatingSpriteState = atom<Sprite | null>({
    key: 'currentOperatingSpriteState',
    default: null,
});

export const isDrawingState = atom({
    key: 'isDrawingState',
    default: false,
});