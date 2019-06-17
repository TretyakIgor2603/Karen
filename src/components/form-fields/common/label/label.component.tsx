import React, { memo } from "react";
import cn from "classnames";
// Style
import styles from "./label.module.css";
// TS types
export type LabelPosition = "top" | "left";
type Props = {
    fieldId: string;
    children: React.ReactNode;
    labelPosition?: LabelPosition;
}

const LabelComponent = (props: Props): React.ReactElement<Props> => {
    const { children, fieldId, labelPosition } = props;

    const classNames = cn(`${styles.label}`, {
        [styles.top]: labelPosition === "top",
        [styles.left]: labelPosition === "left"
    });

    return <label htmlFor={fieldId} className={classNames}>{children}</label>;
};

export default memo(LabelComponent);
