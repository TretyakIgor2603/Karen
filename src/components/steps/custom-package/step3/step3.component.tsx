import React, { useEffect } from "react";
// Utils
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
import { get } from "local-storage";
// Redux
import redux, { connect } from "react-redux";
import { getDesignStylesListAction } from "../redux-duck/actions";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";

type OwnProps = { children?: never };
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
    getDesignStylesList: typeof getDesignStylesListAction;
};
type Props = OwnProps & ReduxDispatchToProps;

const Step3Component = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep3, get(CustomPackage.CustomPackageStep3));
        props.getDesignStylesList();
        // eslint-disable-next-line
    }, []);

    return (
        <Layout title="What's your style?">
            <Form />
        </Layout>
    );
};

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues)),
    getDesignStylesList: () => dispatch(getDesignStylesListAction())
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step3Component);
