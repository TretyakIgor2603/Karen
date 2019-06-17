import React from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../app-constants";
import { onFormSubmitLogin } from "../../steps/custom-package/utils/submitting";
import { syncValidate, validate } from "../../form-fields/utils/sync-validate";
// Redux
import form, { reduxForm } from "redux-form";
import redux, { connect } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector } from "../../steps/custom-package/redux-duck/selectors";
// Components
import { MainLoader, Input, MainButton } from "../../all-components";
// TS types
import { ReduxState } from "../../../redux/root-reducer";

type OwnProps = {
    children?: never;
    switchFrom: () => void;
};
type ReduxStateToProps = {
    isLoading: boolean;
};
type FormData = {
    email: string;
    password: string;
}
type Props = OwnProps & ReduxStateToProps & form.InjectedFormProps<FormData, OwnProps>;

const RegistrationFormComponent = (props: Props): React.ReactElement<Props> => {
    const { switchFrom, handleSubmit, isLoading, invalid, submitting, pristine } = props;

    return (
        <form noValidate onSubmit={handleSubmit} className={styles.form}>
            {
                isLoading ? (
                    <div className={styles.loader}>
                        <MainLoader />
                    </div>
                ) : (
                    <>
                        <header className={styles.header}>
                            <h1 className={styles.title}>Welcome Back!</h1>
                            <p className={styles.text}>Sign in to your Furnishr account</p>
                        </header>
                        <fieldset className={styles.fieldset} disabled={submitting}>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="email"
                                    type="email"
                                    label="Email address"
                                    validate={[syncValidate.required, syncValidate.email]}
                                />
                            </div>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="password"
                                    type="password"
                                    label="Password"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                            <a href="#password-recovery" className={styles.link}>Forgot your password?</a>
                        </fieldset>
                        <div className={styles["submit-button-wrapper"]}>
                            <MainButton
                                className={styles["submit-button"]}
                                type="submit"
                                disabled={invalid || pristine || submitting}
                            >
                                Continue
                            </MainButton>
                        </div>
                        <p className={styles.text}>Don't have an account?{" "}
                            <a href="#create-account" className={styles.link} onClick={switchFrom}>Create one now</a>
                        </p>
                    </>
                )
            }
        </form>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state)
});

export default compose<React.ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.Login,
        onSubmit: onFormSubmitLogin,
        validate
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(RegistrationFormComponent);
