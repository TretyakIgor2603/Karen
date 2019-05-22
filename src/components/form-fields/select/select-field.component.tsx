import React, { ReactElement } from "react";
// Components
import Field, { Option } from "../common/field.component";
import SelectComponent from "./select.component";
// TS types
export type SelectProps = {
    name: string;
    className: string;
    placeholder: string;
    options: Option[];
};
type Props = { children?: never } & SelectProps

const SelectFieldComponent = (props: Props): ReactElement<Props> => {
    const { name, placeholder, className, options } = props;

    return (
        <Field
            name={name}
            className={className}
            placeholder={placeholder}
            component={SelectComponent}
            options={options}
        />
    );
};

export default SelectFieldComponent;