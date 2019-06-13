import React, { ReactElement } from "react";
// Components
import Field, { InputProps } from "../common/field.component";
import HiddenInputComponent from "./hidden-input.component";

type Props = InputProps

const HiddenInputFieldComponent = (props: Props): ReactElement<Props> => {
    const { name, initialValue } = props;

    return <Field name={name} initialValue={initialValue} component={HiddenInputComponent} />;
};

export default HiddenInputFieldComponent;
