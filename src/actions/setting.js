import {
    PUSH_SPRITE,
    SELECTED_LEVEL_SWITCH,
    REMOVE_SPRITE,
    OPEN_SPRITE_SETTING,
    CLOSE_SPRITE_SETTING,
    TRANSFORM_SPRITE,
    UPDATE_COMPLETED,
} from '../constants/setting'

export const pushSprite = (level, sprite) => {
    return {
        type: PUSH_SPRITE,
        level: level,
        sprite: sprite
    }
}

export const selectedLevelSwitch = (selectedLevel) => {
    return {
        type: SELECTED_LEVEL_SWITCH,
        selectedLevel: selectedLevel
    }
}

export const removeSprite = (currentOperatingLevel, id) => {
    return {
        type: REMOVE_SPRITE,
        currentOperatingLevel: currentOperatingLevel,
        id: id
    }
}

export const openSpriteSetting = (level, id) =>{
    return {
        type: OPEN_SPRITE_SETTING,
        level,
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
