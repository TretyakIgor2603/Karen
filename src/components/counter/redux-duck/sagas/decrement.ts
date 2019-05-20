import { SagaIterator } from "@redux-saga/core";
import { put, takeLatest } from "redux-saga/effects";
import { DECREMENT } from "../constants";
import { decrementActionDone } from "../actions";

function* decrementSaga(): SagaIterator {
    yield put(decrementActionDone());
}

export default function* (): SagaIterator {
    yield takeLatest(DECREMENT, decrementSaga);
}
