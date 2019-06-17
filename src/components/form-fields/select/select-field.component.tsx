import React from "react";
// Components
import Field, { Option } from "../common/field.component";
import SelectComponent from "./select.component";
// TS types
import form from "redux-form";

export type SelectProps = {
    name: string;
    className: string;
    placeholder?: string;
    label?: string;
    options: Option[];
    validate?: form.FieldsWarnerOrValidator
};
type Props = { children?: never } & SelectProps

const SelectFieldComponent = (props: Props): React.ReactElement<Props> => {
    const { name, placeholder, label, className, options, validate } = props;

    return (
        <Field
            name={name}
            className={className}
            placeholder={placeholder}
            label={label}
            component={SelectComponent}
            options={options}
            validate={validate}
        />
    );
};

export default SelectFieldComponent;
