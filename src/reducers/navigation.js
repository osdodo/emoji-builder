import {
    SET_STATUS_BAR_HEIGHT,
    OPEN_NAV_ACTION_SHEET,
    CLOSE_NAV_ACTION_SHEET
} from '../constants/navigation'

const INITIAL_STATE = {
    statusBarHeight: 0,
    isOpenedNavActionSheet: false
}

export default function navigation(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_STATUS_BAR_HEIGHT:
            return {
                ...state,
                statusBarHeight: action.statusBarHeight
            }
        case OPEN_NAV_ACTION_SHEET:
            return {
                ...state,
                isOpenedNavActionSheet: true
            }
        case CLOSE_NAV_ACTION_SHEET:
            return {
                ...state,
                isOpenedNavActionSheet: false
            }
        default:
            return state
    }
}
