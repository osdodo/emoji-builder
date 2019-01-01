import {
    PUSH_SPRITE,
    SELECTED_LEVEL_SWITCH,
    REMOVE_SPRITE,
    OPEN_SPRITE_SETTING,
    CLOSE_SPRITE_SETTING,
    TRANSFORM_SPRITE,
    UPDATE_COMPLETED,
} from '../constants/setting'

const INITIAL_STATE = {
    level1List: [],
    level2List: [],
    level3List: [],
    level4List: [],
    currentSelectedLevel: 1,
    currentOperatingLevel: 0,
    isSettingProperty: false,
    currentSettingSprite: {},
    isUpdating: false,
}

const getCurrentSettingSprite = (state, action) => {
    switch (action.level) {
        case 1:
            return findSprite(state.level1List, action.id)
        case 2:
            return findSprite(state.level2List, action.id)
        case 3:
            return findSprite(state.level3List, action.id)
        case 4:
            return findSprite(state.level4List, action.id)
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
            switch (action.level) {
                case 1:
                    return {
                        ...state,
                        level1List: [action.sprite],
                        isUpdating: true,
                        currentOperatingLevel: 1
                    }
                case 2:
                    return {
                        ...state,
                        level2List: [
                            ...state.level2List,
                            action.sprite
                        ]
                    }
                case 3:
                    return {
                        ...state,
                        level3List: [
                            ...state.level3List,
                            action.sprite
                        ]
                    }
                case 4:
                    return {
                        ...state,
                        level4List: [
                            ...state.level4List,
                            action.sprite
                        ]
                    }
            }
        case SELECTED_LEVEL_SWITCH:
            return {
                ...state,
                currentSelectedLevel: action.selectedLevel
            }
        case REMOVE_SPRITE:
            switch (action.currentOperatingLevel) {
                case 1:
                    return {
                        ...state,
                        level1List: state.level1List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLevel: 1
                    }
                case 2:
                    return {
                        ...state,
                        level2List: state.level2List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLevel: 2
                    }
                case 3:
                    return {
                        ...state,
                        level3List: state.level3List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLevel: 3
                    }
                case 4:
                    return {
                        ...state,
                        level4List: state.level4List.filter(item => {
                            return item.id !== action.id
                        }),
                        isUpdating: true,
                        currentOperatingLevel: 4
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
            switch (action.sprite.level) {
                case 1:
                    return {
                        ...state,
                        level1List: updateSpriteList(state.level1List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLevel: 1
                    }
                case 2:
                    return {
                        ...state,
                        level2List: updateSpriteList(state.level2List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLevel: 2
                    }
                case 3:
                    return {
                        ...state,
                        level3List: updateSpriteList(state.level3List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLevel: 3
                    }
                case 4:
                    return {
                        ...state,
                        level4List: updateSpriteList(state.level4List, action.sprite),
                        currentSettingSprite: action.sprite,
                        isUpdating: true,
                        currentOperatingLevel: 4
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
