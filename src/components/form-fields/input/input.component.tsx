import React from "react";
import cn from "classnames";
// Style
import styles from "./input.module.css";
// Components
import Label from "../common/label/label.component";
import Message from "../common/message/message.component";
// TS types
import form from "redux-form";
import { InputProps } from "../common/field.component";

type Props = InputProps & form.WrappedFieldProps

const InputComponent = (props: Props): React.ReactElement<Props> => {
    const { type, label, placeholder, labelPosition, className, meta, input } = props;
    const { warning, error, touched, invalid } = meta;

    const wrapperClassName = cn(`${styles.wrapper}`, {
        [styles["field-label__left"]]: labelPosition === "left"
    });

    const fieldClassName = cn(`text-ellipsis ${styles.field}`, {
        [styles["field__error"]]: touched && invalid,
        [styles["field__warning"]]: touched && warning
    });

    return (
        <div className={wrapperClassName}>
            {label && (
                <Label
                    fieldId={`${input.name}-id`}
                    labelPosition={labelPosition}
                >
                    {label}
                </Label>
            )}
            <div className={`${styles["field-wrapper"]} ${className}`}>
                <input
                    {...input}
                    id={`${input.name}-id`}
                    type={type}
                    placeholder={placeholder}
                    className={fieldClassName}
                    autoComplete="off"
                />
                {(touched && (error || warning)) && <Message warning={warning} error={error} />}
            </div>
        </div>
    );
};

export default InputComponent;
