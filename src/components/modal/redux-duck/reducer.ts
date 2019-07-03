import * as Type from "./constants";
// TS types
import { ModalActions } from "./actions";

export type ModalState = {
    isPopupOpen: boolean
}

const INITIAL_STATE = Object.freeze({
    isPopupOpen: false
});

export default (state: ModalState = INITIAL_STATE, action: ModalActions): ModalState => {
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
