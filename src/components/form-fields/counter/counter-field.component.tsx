import React, { ReactElement } from "react";
// Components
import Field from "../common/field.component";
import Counter from "./counter.component";
// TS types
type Props = {
    name: string;
    autoFocus?: boolean;
    initialValue?: number;
    children?: never;
}

const CounterFieldComponent = (props: Props): ReactElement<Props> => {
    const { name, initialValue, autoFocus } = props;

    return <Field name={name} component={Counter} initialValue={initialValue} autoFocus={autoFocus} />;
};

export default CounterFieldComponent;
