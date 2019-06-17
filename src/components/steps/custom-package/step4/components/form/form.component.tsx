import React from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep4 } from "../../../utils/submitting";
import { syncValidate } from "../../../../../form-fields/utils/sync-validate";
// Redux
import form, { reduxForm } from "redux-form";
import redux, { connect } from "react-redux";
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
    deliver_city: string;
    styles: any;
    people_counter: number | string;
    reason_id: string;
    preferred_delivery_date: string;
};
type Props = OwnProps & ReduxStateToProps & form.InjectedFormProps<FormData, OwnProps>;

const reasonOptions = [
    { value: "1", label: "1. investment property" },
    { value: "2", label: "2. moving for work" },
    { value: "3", label: "3. first home" },
    { value: "4", label: "4. redecorating" }
];

const deliveryOptions = [
    { value: "1", label: "1. within 1 month" },
    { value: "2", label: "2. in 2-3 months" },
    { value: "3", label: "3. 3 months later" },
    { value: "4", label: "4. no plan to move" }
];

const FormComponent = (props: Props): React.ReactElement<Props> => {
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
                                    name="deliver_city"
                                    label="Which city will this property be in?"
                                    validate={[syncValidate.required]}
                                />
                            </div>
                        </div>
                        <div className={styles.fieldset}>
                            <div className={styles["field-wrapper"]}>
                                <Select
                                    className={styles.select}
                                    name="preferred_delivery_date"
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
                            name="styles"
                            formName={FormName.CustomPackageStep4}
                            label="Allow user to upload files in image formats and pdf"
                        />
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
        form: FormName.CustomPackageStep4,
        onSubmit: onFormSubmitStep4
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
