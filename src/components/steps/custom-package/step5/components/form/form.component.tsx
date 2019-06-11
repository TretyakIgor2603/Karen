import React, { ComponentType, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep5 } from "../../../utils";
// Redux
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { MainLoader } from "../../../../../all-components";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";

type OwnProps = { children?: never; };
type ReduxStateToProps = {
    isLoading: boolean;
};
type FormData = {
    BudgetString: string
};
type Props = OwnProps & ReduxStateToProps & InjectedFormProps<FormData, OwnProps>;

const FormComponent = (props: Props): ReactElement<Props> => {
    const { handleSubmit, isLoading } = props;

    return (
        <form noValidate onSubmit={handleSubmit}>
            {
                isLoading ? (
                    <div className={styles.loader}>
                        <MainLoader />
                    </div>
                ) : (
                    <div>Budget</div>
                )
            }
        </form>
    );
};

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state)
});

export default compose<ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep5,
        onSubmit: onFormSubmitStep5
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
