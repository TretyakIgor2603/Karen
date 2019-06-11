import React, { ComponentType, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep6Registration } from "../../../utils";
import { syncValidate, validate } from "../../../../../form-fields/utils/sync-validate";
// Redux
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { MainLoader, Input, MainButton } from "../../../../../all-components";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";

type OwnProps = {
    children?: never;
    switchFrom: () => void;
}
type ReduxStateToProps = {
    isLoading: boolean;
};
type FormData = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    password: string;
    confirm_password: string;
}
type Props = OwnProps & ReduxStateToProps & InjectedFormProps<FormData, OwnProps>;

const RegistrationFormComponent = (props: Props): ReactElement<Props> => {
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
                        <h1 className={styles.title}>Registration account</h1>
                        <div className={styles["fieldset-column"]}>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="first_name"
                                    label="First name"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="last_name"
                                    label="Last name"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                        </div>
                        <div className={styles["fieldset-column"]}>
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
                                    name="phone_number"
                                    type="tel"
                                    label="Phone number"
                                    validate={[syncValidate.required, syncValidate.phone]}
                                />
                            </div>
                        </div>
                        <div className={styles["fieldset-column"]}>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="password"
                                    type="password"
                                    label="Password"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="confirm_password"
                                    type="password"
                                    label="Confirm password"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                        </div>
                        <div className={styles["submit-button-wrapper"]}>
                            <MainButton
                                className={styles["submit-button"]}
                                type="submit"
                                disabled={invalid || pristine || submitting}
                            >
                                Continue
                            </MainButton>
                        </div>
                        <p className={styles.text}>Already have account?{" "}
                            <a href="#login" className={styles.link} onClick={switchFrom}>Log in</a>
                        </p>
                    </>
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
        form: FormName.CustomPackageStep6Registration,
        onSubmit: onFormSubmitStep6Registration,
        validate
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(RegistrationFormComponent);
