import {
    PUSH_SPRITE,
    SELECTED_LAYER_SWITCH,
    REMOVE_SPRITE,
    OPEN_SPRITE_SETTING,
    CLOSE_SPRITE_SETTING,
    TRANSFORM_SPRITE,
    DRAW_COMPLETED,
} from '../constants/setting'

const INITIAL_STATE = {
    layer1List: [],
    layer2List: [],
    layer3List: [],
    layer4List: [],
    currentSelectedLayer: 1,
    currentOperatingLayer: 0,
    isSettingProperty: false,
    currentSettingSprite: {},
    isDrawing: false,
}

const findSprite = (spriteList, id) => {
    for (let i = 0, len = spriteList.length; i < len; i++) {
        if (spriteList[i].id === id) {
            return spriteList[i]
        }
    }
    return {}
}


const updateSpriteList = (spriteList, sprite) => {
    const newSpriteList = [...spriteList]
    for (let i = 0, len = newSpriteList.length; i < len; i++) {
        if (newSpriteList[i].id === sprite.id) {
            newSpriteList[i] = sprite
            break
        }
    }
    return newSpriteList
}

export default function setting(state = INITIAL_STATE, action) {
    switch (action.type) {
        case PUSH_SPRITE:
            {
                const { currentOperatingLayer } = action
                if (currentOperatingLayer === 1) {
                    return {
                        ...state,
                        layer1List: [action.sprite],
                        isDrawing: true,
                        currentOperatingLayer: 1
                    }
                }
                return {
                    ...state,
                    [`layer${currentOperatingLayer}List`]: [
                        ...state[`layer${currentOperatingLayer}List`],
                        action.sprite
                    ]
                }
            }
        case SELECTED_LAYER_SWITCH:
            return {
                ...state,
                currentSelectedLayer: action.selectedLayer
            }
        case REMOVE_SPRITE:
            {
                const { currentOperatingLayer } = action
                return {
                    ...state,
                    currentOperatingLayer,
                    [`layer${currentOperatingLayer}List`]: state[`layer${currentOperatingLayer}List`].filter(item => {
                        return item.id !== action.id
                    }),
                    isDrawing: true
                }
            }
        case OPEN_SPRITE_SETTING:
            return {
                ...state,
                currentSettingSprite: findSprite(state[`layer${action.currentOperatingLayer}List`], action.id),
                isSettingProperty: true
            }
        case CLOSE_SPRITE_SETTING:
            return {
                ...state,
                isSettingProperty: false,
            }
        case TRANSFORM_SPRITE:
            {
                const currentOperatingLayer = action.sprite.layer
                return {
                    ...state,
                    currentOperatingLayer,
                    [`layer${currentOperatingLayer}List`]: updateSpriteList(state[`layer${currentOperatingLayer}List`], action.sprite),
                    currentSettingSprite: action.sprite,
                    isDrawing: true
                }
            }
        case DRAW_COMPLETED:
            return {
                ...state,
                isDrawing: false
            }
        default:
            return state
    }
}
