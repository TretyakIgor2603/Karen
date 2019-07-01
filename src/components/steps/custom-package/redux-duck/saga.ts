import { all, fork } from "redux-saga/effects";
// TS types
import { SagaIterator } from "@redux-saga/core";
// Sagas
import getRoomListSaga from "./sagas/get-room-list";
import getFurnitureListSaga from "./sagas/get-furniture-list";
import getDesignStylesListSaga from "./sagas/get-design-styles-list";
import calculateMiddlePriceSaga from "./sagas/calculate-middle-price";

export default function* (): SagaIterator {
    yield all([
        fork(getRoomListSaga),
        fork(getFurnitureListSaga),
        fork(getDesignStylesListSaga),
        fork(calculateMiddlePriceSaga)
    ]);
}
