import { SagaIterator } from "@redux-saga/core";
import { put, takeLatest } from "redux-saga/effects";
import { INCREMENT } from "../constants";
import { incrementActionDone } from "../actions";

function* incrementSaga(): SagaIterator {
    yield put(incrementActionDone());
}

export default function* (): SagaIterator {
    yield takeLatest(INCREMENT, incrementSaga);
}
