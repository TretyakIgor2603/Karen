import * as Type from "./constants";

type WatchPopup = {
    type: string;
}

export type ModalActions = WatchPopup;

export const openPopupAction = (): WatchPopup => ({ type: Type.OPEN_POPUP });

export const closePopupAction = (): WatchPopup => ({ type: Type.CLOSE_POPUP });
