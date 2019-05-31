import React, { useEffect, ReactElement } from "react";
// Utils
import { get } from "local-storage";
import { initialize } from "redux-form";
// Redux
import { connect, MapDispatchToProps } from "react-redux";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
import { FormName } from "../../../../app-constants";
import { ReduxState } from "../../../../redux/root-reducer";
import { CustomPackage } from "./utils";
// TS types
type OwnProps = { children?: never }
type ReduxDispatchToProps = { initializeForm: typeof initialize }
type Props = OwnProps & ReduxDispatchToProps

const Step1Component = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep1, get(CustomPackage.CustomPackageStep1));
        // eslint-disable-next-line
    }, []);

    return (
        <Layout title="How many rooms do you need to furnish?">
            <Form />
        </Layout>
    );
};

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step1Component);
