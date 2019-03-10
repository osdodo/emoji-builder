import {
    SET_STATUS_BAR_HEIGHT,
    OPEN_NAV_ACTION_SHEET,
    CLOSE_NAV_ACTION_SHEET
} from '../constants/navigation'

export const setStatusBarHeight = (val) => {
    return {
        type: SET_STATUS_BAR_HEIGHT,
        statusBarHeight: val,
    }
}

export const openNavActionSheet = () => {
    return {
        type: OPEN_NAV_ACTION_SHEET
    }
}

export const closeNavActionSheet = () => {
    return {
        type: CLOSE_NAV_ACTION_SHEET
    }
}
