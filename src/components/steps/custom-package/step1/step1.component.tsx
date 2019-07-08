import React, { useEffect } from "react";
// Utils
import _get from "lodash/fp/get";
import _isEmpty from "lodash/fp/isEmpty";
import { get, set } from "local-storage";
import form, { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
// Redux
import redux, { connect } from "react-redux";
import { getRoomListAction, saveCategoriesIdsAction } from "../redux-duck/actions";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { getSelectedCategories } from "../utils/dataCollection";

type OwnProps = { children?: never }
type ReduxStateToProps = {
    formValues: form.FormState;
}
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
    getRoomList: typeof getRoomListAction;
    saveCategoriesIds: typeof saveCategoriesIdsAction;
}
type Props = OwnProps & ReduxDispatchToProps & ReduxStateToProps

const getCounterDifference = (formValues: Partial<form.FormState>) => {
    const ids: number[] = [];
    const counts: any = {};
    const fieldValues = _get("values", formValues);

    const selectedCategoriesFromLS = getSelectedCategories(get(CustomPackage.CustomPackageStep1));
    const selectedCategoriesFromForm = getSelectedCategories(fieldValues);

    if (selectedCategoriesFromForm && selectedCategoriesFromLS) {
        for (const [key, value] of Object.entries(selectedCategoriesFromForm)) {
            if (selectedCategoriesFromLS[key] > value) {
                const id = key.split("-")[1];
                ids.push(parseInt(id, 10));

                counts[id] = { count: selectedCategoriesFromLS[key] - value };
            }
        }
    }

    return { ids, counts };
};

const Step1Component = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        props.getRoomList();
        props.initializeForm(FormName.CustomPackageStep1, get(CustomPackage.CustomPackageStep1));
        // eslint-disable-next-line
    }, []);

    const { formValues, saveCategoriesIds } = props;

    const fieldValues = getCounterDifference(formValues);
    saveCategoriesIds(fieldValues.ids);

    if (!_isEmpty(fieldValues.counts)) {
        set(CustomPackage.CustomPackageStep1Count, fieldValues.counts);
    }

    return (
        <Layout title="How many rooms do you need to furnish?">
            <Form />
        </Layout>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    formValues: state.form[FormName.CustomPackageStep1]
});

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any): form.FormAction => dispatch(initialize(formName, initialValues)),
    getRoomList: () => dispatch(getRoomListAction()),
    saveCategoriesIds: (ids: number[]) => dispatch(saveCategoriesIdsAction(ids))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(Step1Component);
