import React, { memo } from "react";
// Components
import form, { Field } from "redux-form";
// TS types
import { LabelPosition } from "./label/label.component";

type InputType = "text" | "email" | "password" | "search" | "tel" | "number";
export type Option = {
    value: string | number;
    label: string | number;
}
export type InputProps = {
    name: string;
    initialValue?: number | string;
    autoFocus?: boolean;
    type?: InputType;
    className?: string;
    labelPosition?: LabelPosition;
    label?: string;
    placeholder?: string;
    options?: Option[];
    validate?: form.FieldsWarnerOrValidator;
    warn?: any;
    children?: never;
}
type Props = { component: React.ReactNode } & InputProps

const FieldComponent = (props: Props): React.ReactElement<Props> => {
    const { component: Component, ...restProps } = props;

    return <Field {...restProps} component={Component} />;
};

export default memo(FieldComponent);
