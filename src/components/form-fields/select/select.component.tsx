import React, { ReactElement } from "react";
import cn from "classnames";
// Style
import "rc-select/assets/index.css";
import "./select.style.css";
// Components
import Select, { Option } from "rc-select";
// TS types
import { WrappedFieldProps } from "redux-form";
import { SelectProps } from "./select-field.component";

type Props = { children?: never } & WrappedFieldProps & SelectProps

const SelectComponent = (props: Props): ReactElement<Props> => {
    const { className, placeholder, input, options } = props;
    const { value, onChange } = input;

    const wrapperClassName = cn(`${className}`, {
        placeholder: !value
    });

    const optionsBody = (options && options.length) ? (
        options.map((option) => <Option key={option.value} value={option.label}>{option.label}</Option>)
    ) : null;

    return (
        <div className={wrapperClassName}>
            <Select
                className="select"
                dropdownClassName="select__dropdown"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            >
                {optionsBody}
            </Select>
        </div>
    );
};

export default SelectComponent;
