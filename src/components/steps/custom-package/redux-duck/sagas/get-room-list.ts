import { SagaIterator } from "@redux-saga/core";
import { put, call, takeLatest } from "redux-saga/effects";
import { GET_ROOM_LIST } from "../constants";
import { getRoomListDoneAction, getRoomListErrorAction } from "../actions";
import Http from "../../../../../api/custom-package";
import { getAxiosError } from "../../../../../utils/helpers";
import { toastr } from "react-redux-toastr";

function* getRoomListSaga(): SagaIterator {
    try {
        const getRoomListMethod = Http.getRoomList;
        const response = yield call(getRoomListMethod);
        yield put(getRoomListDoneAction(response.data));
    } catch (error) {
        const toastrErrorMethod: any = toastr.error;
        const err = getAxiosError(error);
        yield call(toastrErrorMethod, "Error", err);
        yield put(getRoomListErrorAction(err));
    }
}

export default function* (): SagaIterator {
    yield takeLatest(GET_ROOM_LIST, getRoomListSaga);
}
