import {
    PUSH_SPRITE,
    SELECTED_LAYER_SWITCH,
    REMOVE_SPRITE,
    OPEN_SPRITE_SETTING,
    CLOSE_SPRITE_SETTING,
    TRANSFORM_SPRITE,
    DRAW_COMPLETED,
} from '../constants/setting'

export const pushSprite = (currentOperatingLayer, sprite) => {
    return {
        type: PUSH_SPRITE,
        currentOperatingLayer,
        sprite
    }
}

export const selectedLayerSwitch = (selectedLayer) => {
    return {
        type: SELECTED_LAYER_SWITCH,
        selectedLayer
    }
}

export const removeSprite = (currentOperatingLayer, id) => {
    return {
        type: REMOVE_SPRITE,
        currentOperatingLayer,
        id
    }
}

export const openSpriteSetting = (currentOperatingLayer, id) =>{
    return {
        type: OPEN_SPRITE_SETTING,
        currentOperatingLayer,
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

export const drawCompleted = () => {
    return {
        type: DRAW_COMPLETED,
    }
}
