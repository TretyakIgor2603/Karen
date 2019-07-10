import React, { useEffect, useState } from "react";
// Utils
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
import { get } from "local-storage";
import _get from "lodash/fp/get";
// Redux
import redux, { connect } from "react-redux";
import { getFormValues, change } from "redux-form";
import { getDesignStylesListAction } from "../redux-duck/actions";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";

type OwnProps = { children?: never };
type ReduxStateToProps = {
    values: any;
    activeField: string | undefined;
}
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
    getDesignStylesList: typeof getDesignStylesListAction;
    changeValue: typeof change;
};
type Props = OwnProps & ReduxDispatchToProps & ReduxStateToProps;

const Step3Component = (props: Props): React.ReactElement<Props> => {
    const [tempArray, setTempArray] = useState<string[]>([]);
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep3, get(CustomPackage.CustomPackageStep3));
        props.getDesignStylesList();
        // eslint-disable-next-line
    }, []);

    const handleInputChange = (name: string): void => {
        if (tempArray.length === 3 && !tempArray.includes(name)) {
            props.changeValue(FormName.CustomPackageStep3, tempArray[0], false);
            setTempArray([...tempArray.slice(1), name]);
            props.changeValue(FormName.CustomPackageStep3, name, true);
        } else if (tempArray.includes(name)) {
            setTempArray(tempArray.filter((fieldName: string) => fieldName !== name));
            props.changeValue(FormName.CustomPackageStep3, name, false);
        } else {
            props.changeValue(FormName.CustomPackageStep3, name, true);
            setTempArray([...tempArray, name]);
        }
    };

    return (
        <Layout title="What's your style?">
            <Form onInputChange={handleInputChange} />
        </Layout>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => {
    const getFormValueSelector = getFormValues(FormName.CustomPackageStep3);

    return {
        values: getFormValueSelector(state),
        activeField: _get("active", state.form[FormName.CustomPackageStep3])
    };
};

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues)),
    getDesignStylesList: () => dispatch(getDesignStylesListAction()),
    changeValue: (form: string, field: string, value: boolean) => dispatch(change(form, field, value))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(Step3Component);
