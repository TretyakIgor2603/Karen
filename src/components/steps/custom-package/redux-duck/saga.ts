import { SagaIterator } from "@redux-saga/core";
import { all, fork } from "redux-saga/effects";
// Sagas
import getRoomListSaga from "./sagas/get-room-list";

export default function* (): SagaIterator {
    yield all([
        fork(getRoomListSaga)
    ]);
}
