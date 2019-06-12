import React, { useEffect, ReactElement } from "react";
// Utils
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
import { get } from "local-storage";
import _get from "lodash/fp/get";
// Redux
import { connect, MapDispatchToProps } from "react-redux";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { FormData } from "./components/form/form.component";

type OwnProps = { children?: never; };
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
}
type Props = OwnProps & ReduxDispatchToProps;

const Step4Component = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        const formFields: FormData = get(CustomPackage.CustomPackageStep4);
        props.initializeForm(FormName.CustomPackageStep4, {
            "reason_id": _get("reason_id", formFields),
            "city": _get("city", formFields),
            "delivery": _get("delivery", formFields),
            "people_counter": _get("people_counter", formFields),
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
