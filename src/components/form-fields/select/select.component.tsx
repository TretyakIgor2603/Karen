import React, { ReactElement, useState } from "react";
import cn from "classnames";
// Style
import "rc-select/assets/index.css";
import "./select.style.css";
// Components
import Select, { Option } from "rc-select";
import Label from "../common/label/label.component";
import Message from "../common/message/message.component";
// TS types
import { WrappedFieldProps } from "redux-form";
import { SelectProps } from "./select-field.component";

type Props = { children?: never } & WrappedFieldProps & SelectProps

const SelectComponent = (props: Props): ReactElement<Props> => {
    const [touch, setTouch] = useState<boolean>(false);
    const { className, placeholder, label, input, options, meta } = props;
    const { value, onChange, name } = input;
    const { error, warning } = meta;

    const wrapperClassName = cn(`${className}`, {
        placeholder: !value
    });

    const optionsBody = (options && options.length) ? (
        options.map((option) => <Option key={option.value} value={option.label}>{option.label}</Option>)
    ) : null;

    const selectorClassName = cn("select", {
        error: error && touch,
        warning: warning && touch
    });

    const onSelectBlur = (): void => setTouch(true);

    return (
        <div className={wrapperClassName}>
            <Label fieldId={`${name}-id`}>{label}</Label>
            <Select
                className={selectorClassName}
                dropdownClassName="select__dropdown"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onSelectBlur}
            >
                {optionsBody}
            </Select>
            {touch && (error || warning) && <Message warning={warning} error={error} />}
        </div>
    );
};

export default SelectComponent;
