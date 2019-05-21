import React, { memo, ReactElement, ReactNode } from "react";
// Style
import styles from "./main-button.module.css";
// Utils
import cn from "classnames";
import { noop } from "../../../utils/helpers";
// TS types
type Button = "submit" | "button";

type Props = {
    onClick: () => {};
    children: ReactNode;
    className: string;
    type?: Button;
    disabled?: boolean;
}

const MainButtonComponent = (props: Props): ReactElement<Props> => {
    const {
        children,
        className,
        type = "button",
        disabled = false,
        onClick = noop
    } = props;

    const classNames = cn(`button text-ellipsis ${styles.button} ${className}`, {
        disabled,
        [styles.disabled]: disabled
    });

    return (
        <button
            className={classNames}
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {children}
        </button>
    );
};

export default memo(MainButtonComponent);
