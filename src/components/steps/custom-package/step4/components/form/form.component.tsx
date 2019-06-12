import React, { ComponentType, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep4 } from "../../../utils/submitting";
import { syncValidate } from "../../../../../form-fields/utils/sync-validate";
// Redux
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { MainLoader, Input, Select, FileUploader } from "../../../../../all-components";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";

type OwnProps = { children?: never; };
type ReduxStateToProps = {
    isLoading: boolean;
};
export type FormData = {
    city: string;
    dropzone: any;
    people_counter: number | string;
    reason_id: string;
    delivery: string;
};
type Props = OwnProps & ReduxStateToProps & InjectedFormProps<FormData, OwnProps>;

const reasonOptions = [
    { value: "1", label: "investment property" },
    { value: "2", label: "moving for work" },
    { value: "3", label: "first home" },
    { value: "4", label: "redecorating" }
];

const deliveryOptions = [
    { value: "1", label: "within 1 month" },
    { value: "2", label: "in 2-3 months" },
    { value: "3", label: "3 months later" },
    { value: "4", label: "no plan to move" }
];

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
                    <>
                        <div className={styles.fieldset}>
                            <div className={styles["field-wrapper"]}>
                                <Select
                                    className={styles.select}
                                    name="reason_id"
                                    label="Reason for this project"
                                    placeholder="Select"
                                    options={reasonOptions}
                                    validate={[syncValidate.required]}
                                />
                            </div>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="city"
                                    label="Which city will this property be in?"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                        </div>
                        <div className={styles.fieldset}>
                            <div className={styles["field-wrapper"]}>
                                <Select
                                    className={styles.select}
                                    name="delivery"
                                    label="When do you need this property furnished?"
                                    placeholder="Select"
                                    options={deliveryOptions}
                                    validate={[syncValidate.required]}
                                />
                            </div>
                            <div className={styles["field-wrapper"]}>
                                <Input
                                    name="people_counter"
                                    label="how many people (max) will live in the property?"
                                    type="number"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                        </div>
                        <FileUploader
                            name="dropzone"
                            formName={FormName.CustomPackageStep4}
                            label="Allow user to upload files in image formats and pdf"
                        />
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
        form: FormName.CustomPackageStep4,
        onSubmit: onFormSubmitStep4
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
