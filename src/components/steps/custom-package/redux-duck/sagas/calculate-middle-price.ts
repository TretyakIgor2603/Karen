import { put, call, takeLatest } from "redux-saga/effects";
import { CALCULATE_MIDDLE_PRICE } from "../constants";
import { calculateMiddlePriceDoneAction, calculateMiddlePriceErrorAction } from "../actions";
import Http from "../../../../../api/custom-package";
import { getAxiosError } from "../../../../../utils/helpers";
import { toastr } from "react-redux-toastr";
// TS types
import { SagaIterator } from "@redux-saga/core";
import { AnyAction } from "redux";

function* calculateMiddlePriceSaga({ payload }: AnyAction): SagaIterator {
    try {
        const calculateMiddlePriceMethod = Http.calculateMiddlePrice;
        const response = yield call(calculateMiddlePriceMethod, payload);
        yield put(calculateMiddlePriceDoneAction(response.data.average_cost));
    } catch (error) {
        const toastrErrorMethod: any = toastr.error;
        const err = getAxiosError(error);
        yield call(toastrErrorMethod, "Error", err);
        yield put(calculateMiddlePriceErrorAction(err));
    }
}

export default function* (): SagaIterator {
    yield takeLatest(CALCULATE_MIDDLE_PRICE, calculateMiddlePriceSaga);
}
