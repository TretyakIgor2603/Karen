import React, { useEffect, ReactElement } from "react";
// Utils
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
// import { CustomPackage } from "../utils";
// Redux
import { connect, MapDispatchToProps } from "react-redux";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
// import { get } from "local-storage";

type OwnProps = { children?: never; };
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
}
type Props = OwnProps & ReduxDispatchToProps;

const Step5Component = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        // props.initializeForm(FormName.CustomPackageStep4, get(CustomPackage.CustomPackageStep4));
        props.initializeForm(FormName.CustomPackageStep5, {
            "BudgetString":"$1500 to $3500"
        });
        // eslint-disable-next-line
    }, []);
    return (
        <Layout title="What's your budget for this project?">
            <Form />
        </Layout>
    );
};

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step5Component);