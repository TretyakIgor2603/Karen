import React, { useEffect, ReactElement } from "react";
// Utils
import { get } from "local-storage";
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
// Redux
import { connect, MapDispatchToProps } from "react-redux";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";

type OwnProps = { children?: never };
type ReduxDispatchToProps = { initializeForm: typeof initialize };
type Props = OwnProps & ReduxDispatchToProps;

const Step2Component = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep2, get(CustomPackage.CustomPackageStep2));
        // eslint-disable-next-line
    }, []);

    return (
        <Layout title="Select furniture for each room">
            <Form />
        </Layout>
    );
};

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step2Component);
