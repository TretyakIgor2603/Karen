import React, { useEffect, ReactElement } from "react";
// Utils
import { initialize } from "redux-form";
// import { FormName } from "../../../../app-constants";
// import { CustomPackage } from "../utils";
// Redux
import { connect, MapDispatchToProps } from "react-redux";
// Components
import Layout from "../../layout/layout.component";
import RegistrationForm from "./components/forms/registration-form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
// import { get } from "local-storage";

type OwnProps = { children?: never; };
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
}
type Props = OwnProps & ReduxDispatchToProps;

const Step6Component = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        // props.initializeForm(FormName.CustomPackageStep6, get(CustomPackage.CustomPackageStep6));
        // eslint-disable-next-line
    }, []);
    return (
        <Layout title="Get Your Custom Room">
            <RegistrationForm />
        </Layout>
    );
};

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step6Component);
