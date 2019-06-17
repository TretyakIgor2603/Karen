import React, { useEffect } from "react";
// TS types
import form from "redux-form";
import { InputProps } from "../common/field.component";

type Props = InputProps & form.WrappedFieldProps;

const HiddenInputComponent = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        if (props.initialValue) {
            props.input.onChange(props.initialValue);
        }
        // eslint-disable-next-line
    }, [props.initialValue]);

    const { input } = props;

    return <input {...input} className="visually-hidden" type="hidden" />;
};

export default HiddenInputComponent;
