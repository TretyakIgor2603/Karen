import { SagaIterator } from "@redux-saga/core";
import { put, call, takeLatest } from "redux-saga/effects";
import { GET_FURNITURE_LIST } from "../constants";
import { getFurnitureListDoneAction, getFurnitureListErrorAction, GetFurnitureList } from "../actions";
import Http from "../../../../../api/custom-package";
import { getAxiosError } from "../../../../../utils/helpers";
import { toastr } from "react-redux-toastr";

function* getFurnitureListSaga(action: GetFurnitureList): SagaIterator {
    const { payload } = action;

    try {
        const getFurnitureListMethod = Http.getFurnitureList;
        const response = yield call(getFurnitureListMethod, payload);
        yield put(getFurnitureListDoneAction(response.data));
    } catch (error) {
        const toastrErrorMethod: any = toastr.error;
        const err = getAxiosError(error);
        yield call(toastrErrorMethod, "Error", err);
        yield put(getFurnitureListErrorAction(err));
    }
}

export default function* (): SagaIterator {
    yield takeLatest(GET_FURNITURE_LIST, getFurnitureListSaga);
}
