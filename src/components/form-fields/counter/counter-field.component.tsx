import React, { memo, ReactElement } from "react";
// Components
import Field from "../common/field.component";
import Counter from "./counter.component";
// TS types
type Props = {
    name: string;
    children?: never;
}

const CounterFieldComponent = (props: Props): ReactElement<Props> => {
    const { name } = props;

    return <Field name={name} component={Counter} />;
};

export default memo(CounterFieldComponent);
