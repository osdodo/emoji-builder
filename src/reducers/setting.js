import {
    PUSH_SPRITE,
    SELECTED_LAYER_SWITCH,
    REMOVE_SPRITE,
    OPEN_SPRITE_SETTING,
    CLOSE_SPRITE_SETTING,
    TRANSFORM_SPRITE,
    UPDATE_COMPLETED,
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
    isUpdating: false,
}

const getCurrentSettingSprite = (state, action) => {
    switch (action.layer) {
        case 1:
            return findSprite(state.layer1List, action.id)
        case 2:
            return findSprite(state.layer2List, action.id)
        case 3:
            return findSprite(state.layer3List, action.id)
        case 4:
            return findSprite(state.layer4List, action.id)
    }
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
            switch (action.layer) {
                case 1:
                    return {
                        ...state,
                        layer1List: [action.sprite],
                        isUpdating: true,
                        currentOperatingLayer: 1
                    }
                case 2:
                    return {
                        ...state,
                        layer2List: [
                            ...state.layer2List,
                            action.sprite
                        ]
                    }
                case 3:
                    return {
                        ...state,
                        layer3List: [
                            ...state.layer3List,
                            action.sprite
                        ]
                    }
                case 4:
                    return {
                        ...state,
                        layer4List: [
                            ...state.layer4List,
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
            switch (action.currentOperatingLayer) {
                case 1:
                    return {
                        ...state,
                        layer1List: state.layer1List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLayer: 1
                    }
                case 2:
                    return {
                        ...state,
                        layer2List: state.layer2List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLayer: 2
                    }
                case 3:
                    return {
                        ...state,
                        layer3List: state.layer3List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLayer: 3
                    }
                case 4:
                    return {
                        ...state,
                        layer4List: state.layer4List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLayer: 4
                    }
            }
        case OPEN_SPRITE_SETTING:
            return {
                ...state,
                currentSettingSprite: getCurrentSettingSprite(state, action),
                isSettingProperty: true
            }
        case CLOSE_SPRITE_SETTING:
            return {
                ...state,
                isSettingProperty: false
            }
        case TRANSFORM_SPRITE:
            switch (action.sprite.layer) {
                case 1:
                    return {
                        ...state,
                        layer1List: updateSpriteList(state.layer1List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLayer: 1
                    }
                case 2:
                    return {
                        ...state,
                        layer2List: updateSpriteList(state.layer2List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLayer: 2
                    }
                case 3:
                    return {
                        ...state,
                        layer3List: updateSpriteList(state.layer3List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLayer: 3
                    }
                case 4:
                    return {
                        ...state,
                        layer4List: updateSpriteList(state.layer4List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLayer: 4
                    }
            }
            case UPDATE_COMPLETED:
                return {
                    ...state,
                    isUpdating: false
                }
        default:
            return state
    }
}
