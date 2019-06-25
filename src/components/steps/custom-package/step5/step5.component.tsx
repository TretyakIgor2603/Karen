import React, { useEffect } from "react";
// Utils
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
// Redux
import redux, { connect } from "react-redux";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form/form.component";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";

type OwnProps = { children?: never; };
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
}
type Props = OwnProps & ReduxDispatchToProps;

const Step5Component = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep5, {
            "BudgetString": "$1500 to $3500"
        });
        // eslint-disable-next-line
    }, []);
    return (
        <Layout title="What's your budget for this project?">
            <Form />
        </Layout>
    );
};

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(Step5Component);
