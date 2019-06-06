import { SagaIterator } from "@redux-saga/core";
import { all, fork } from "redux-saga/effects";
// Sagas
import getRoomListSaga from "./sagas/get-room-list";
import getFurnitureListSaga from "./sagas/get-furniture-list";
import getDesignStylesListSaga from "./sagas/get-design-styles-list";

export default function* (): SagaIterator {
    yield all([
        fork(getRoomListSaga),
        fork(getFurnitureListSaga),
        fork(getDesignStylesListSaga)
    ]);
}
