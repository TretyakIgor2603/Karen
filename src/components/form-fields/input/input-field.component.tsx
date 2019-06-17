import React from "react";
// Components
import Field, { InputProps } from "../common/field.component";
import InputComponent from "./input.component";

type Props = InputProps

const InputFieldComponent = (props: Props): React.ReactElement<Props> => {
    const { name, type, label, placeholder, labelPosition, className = "", warn, validate } = props;

    return (
        <Field
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            labelPosition={labelPosition}
            className={className}
            warn={warn}
            validate={validate}
            component={InputComponent}
        />
    );
};

export default InputFieldComponent;
