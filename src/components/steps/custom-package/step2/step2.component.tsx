import React, { useEffect } from "react";
// Utils
import { get } from "local-storage";
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
// Redux
import redux, { connect } from "react-redux";
import { getPopupStatus } from "../../../modal/redux-duck/selectors";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
import { Modal } from "../../../all-components";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";

type OwnProps = { children?: never };
type ReduxStateToProps = { isPopupOpen: boolean };
type ReduxDispatchToProps = { initializeForm: typeof initialize };
type Props = OwnProps & ReduxStateToProps & ReduxDispatchToProps;

const Step2Component = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep2, get(CustomPackage.CustomPackageStep2));
        // eslint-disable-next-line
    }, []);

    const { isPopupOpen } = props;

    return (
        <Layout title="Select furniture for each room">
            <Form />
            {isPopupOpen && (
                <Modal title="Modal title" onClick={() => console.log("button close click")}>
                    <h1>test</h1>
                </Modal>
            )}
        </Layout>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isPopupOpen: getPopupStatus(state)
});

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(Step2Component);
