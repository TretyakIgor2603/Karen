import React, { ReactElement } from "react";
// Style
import styles from "../counter.module.css";
import { FormName } from "../../../app-constants";
// Utils
import { syncValidate } from "../../form-fields/utils/sync-validate";
// Components
import { reduxForm, InjectedFormProps } from "redux-form";
import { Input, Select, InputCounter, FileUploader, MainButton, Stepper, Step } from "../../all-components";

// TS types
type Props = {
    onSubmit: any;
    children?: never;
}

const TestForm = (props: Props & InjectedFormProps<{}, Props>): ReactElement<Props> => {
    const { handleSubmit } = props;

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Input
                type="text"
                name="user_name"
                label="Enter your name"
                labelPosition="top"
                validate={[syncValidate.required]}
            />
            <Input
                type="text"
                name="user_email"
                label="Enter your email"
                labelPosition="left"
                placeholder="Email"
                className={styles["input-size"]}
                warn={[syncValidate.required]}
            />
            <Select
                name="user_select"
                placeholder="Select option"
                className={styles["input-size"]}
                options={[{ value: 1, label: "Test 1" }, { value: 2, label: "Test 2" }, { value: 3, label: "Test 3" }]}
            />
            <InputCounter name="user_counter" />
            <FileUploader name="user_preview" formName={FormName.Test} />
            <MainButton type="submit" className="1">Submit form</MainButton>
            <hr />
            <Stepper defaultStepIndex={0}>
                <Step title="Rooms to furnish">Content 1</Step>
                <Step title="Select furniture">Content 2</Step>
                <Step title="Design styles">Content 3</Step>
                <Step title="Personal questions">Content 4</Step>
                <Step title="Budget">Content 5</Step>
                <Step title="Authenticate">Content 6</Step>
            </Stepper>
        </form>
    );
};

export default reduxForm<{}, Props>({
    form: FormName.Test
})(TestForm);
