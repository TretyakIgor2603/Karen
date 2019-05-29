import React, { ReactElement } from "react";
// Components
import Field from "../common/field.component";
import Counter from "./counter.component";
// TS types
type Props = {
    initialValue?: number;
    name: string;
    children?: never;
}

const CounterFieldComponent = (props: Props): ReactElement<Props> => {
    const { name, initialValue } = props;

    return <Field name={name} component={Counter} initialValue={initialValue} />;
};

export default CounterFieldComponent;
