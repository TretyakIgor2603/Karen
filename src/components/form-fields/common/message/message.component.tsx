import React, { memo } from "react";
// Style
import styles from "./message.module.css";
// TS types
type Props = {
    warning?: string;
    error?: string;
    children?: never;
}

const MessageComponent = (props: Props): React.ReactElement<Props> => {
    const { warning, error } = props;

    return (
        <div className={styles["message-wrapper"]}>
            {warning && (
                <span className={styles["message-warning"]}>
                    {warning}
                </span>
            )}
            {error && (
                <span className={styles["message-error"]}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default memo(MessageComponent);
