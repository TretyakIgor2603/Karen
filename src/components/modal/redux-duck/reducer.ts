import * as Type from "./constants";
// TS types
import { ModalActions } from "./actions";

export type CustomPackageState = {
    isPopupOpen: boolean
}

const INITIAL_STATE = Object.freeze({
    isPopupOpen: false
});

export default (state: CustomPackageState = INITIAL_STATE, action: ModalActions): CustomPackageState => {
    const { type } = action;

    switch (type) {
        case (Type.OPEN_POPUP):
            return {
                ...state,
                isPopupOpen: true
            };

        case (Type.CLOSE_POPUP):
            return {
                ...state,
                isPopupOpen: false
            };

        default:
            return state;
    }
};
