import React, { ReactElement } from "react";
// Style
import styles from "../counter.module.css";
import { FormName } from "../../../app-constants";
// Utils
import { syncValidate } from "../../form-fields/utils/sync-validate";
// Components
import { reduxForm, InjectedFormProps } from "redux-form";
import { Input, Select, MainButton } from "../../all-components";

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
            <MainButton type="submit" className="1">Submit form</MainButton>
        </form>
    );
};

export default reduxForm<{}, Props>({
    form: FormName.Test
})(TestForm);
