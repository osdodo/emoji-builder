import {
    PUSH_SPRITE,
    SELECTED_LAYER_SWITCH,
    REMOVE_SPRITE,
    OPEN_SPRITE_SETTING,
    CLOSE_SPRITE_SETTING,
    TRANSFORM_SPRITE,
    UPDATE_COMPLETED,
} from '../constants/setting'

export const pushSprite = (layer, sprite) => {
    return {
        type: PUSH_SPRITE,
        layer: layer,
        sprite: sprite
    }
}

export const selectedLayerSwitch = (selectedLayer) => {
    return {
        type: SELECTED_LAYER_SWITCH,
        selectedLayer: selectedLayer
    }
}

export const removeSprite = (currentOperatingLayer, id) => {
    return {
        type: REMOVE_SPRITE,
        currentOperatingLayer: currentOperatingLayer,
        id: id
    }
}

export const openSpriteSetting = (layer, id) =>{
    return {
        type: OPEN_SPRITE_SETTING,
        layer,
        id
    }
}

export const closeSpriteSetting = () =>{
    return {
        type: CLOSE_SPRITE_SETTING,
    }
}

export const transformSprite = (sprite) => {
    return {
        type: TRANSFORM_SPRITE,
        sprite
    }
}

export const updateCompleted = () => {
    return {
        type: UPDATE_COMPLETED,
    }
}
