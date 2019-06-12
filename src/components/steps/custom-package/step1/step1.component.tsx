import React, { useEffect, ReactElement } from "react";
// Utils
import { get } from "local-storage";
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
// Redux
import { connect, MapDispatchToProps } from "react-redux";
import { getRoomListAction } from "../redux-duck/actions";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";

type OwnProps = { children?: never }
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
    getRoomList: typeof getRoomListAction;
}
type Props = OwnProps & ReduxDispatchToProps

const Step1Component = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        props.getRoomList();
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
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues)),
    getRoomList: () => dispatch(getRoomListAction())
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step1Component);
