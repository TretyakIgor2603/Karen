import React, { useEffect, ReactElement } from "react";
// Utils
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils";
// Redux
import { connect, MapDispatchToProps } from "react-redux";
import { getDesignStylesListAction } from "../redux-duck/actions";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { get } from "local-storage";

type OwnProps = { children?: never };
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
    getDesignStylesList: typeof getDesignStylesListAction;
};
type Props = OwnProps & ReduxDispatchToProps;

const Step3Component = (props: Props): ReactElement<Props> => {
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

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues)),
    getDesignStylesList: () => dispatch(getDesignStylesListAction())
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step3Component);
