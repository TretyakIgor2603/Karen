import { put, call, takeLatest } from "redux-saga/effects";
import { GET_DESIGN_STYLES_LIST } from "../constants";
import { getDesignStylesListErrorAction, getDesignStylesListDoneAction } from "../actions";
import Http from "../../../../../api/custom-package";
import { getAxiosError } from "../../../../../utils/helpers";
import { toastr } from "react-redux-toastr";
// TS types
import { SagaIterator } from "@redux-saga/core";

function* getDesignStylesListSaga(): SagaIterator {
    try {
        const getDesignStylesListMethod = Http.getDesignStylesList;
        const response = yield call(getDesignStylesListMethod);
        yield put(getDesignStylesListDoneAction(response.data));
    } catch (error) {
        const toastrErrorMethod: any = toastr.error;
        const err = getAxiosError(error);
        yield call(toastrErrorMethod, "Error", err);
        yield put(getDesignStylesListErrorAction(err));
    }
}

export default function* (): SagaIterator {
    yield takeLatest(GET_DESIGN_STYLES_LIST, getDesignStylesListSaga);
}
