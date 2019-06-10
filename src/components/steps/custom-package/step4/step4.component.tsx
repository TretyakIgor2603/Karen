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

const Step4Component = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        // props.initializeForm(FormName.CustomPackageStep4, get(CustomPackage.CustomPackageStep4));
        props.initializeForm(FormName.CustomPackageStep4, {
            "reason_id": "redecorating", // select
            "city": "Toronto", // input (text)
            "style_report[prefer_delivery_month]": "within 1 month", // select
            "people_counter": 4, // input (number)
            "dropzone": "" // file uploader
        });
        // eslint-disable-next-line
    }, []);
    return (
        <Layout title="Just a few more questions">
            <Form />
        </Layout>
    );
};

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step4Component);
