import React from "react";
// Styles
import styles from "./error.module.css";
// Components
import { MainButton } from "../../all-components";
// TS types
type OwnProps = {
    error?: Error;
    eventId?: string;
    reportError: () => any;
    children?: never;
}
type Props = OwnProps

const ErrorComponent = (props: Props): React.ReactElement<Props> => {
    const { reportError, error, eventId } = props;

    const onBackToHomeButtonClick = (): string => window.location.href = "/";

    return (
        <section className={styles.wrapper}>
            <div className={styles.inner}>
                <h1 className={styles.title}>
                    Something is not working right. <br />
                    Please try again soon.
                </h1>
                <div>
                    {(error && eventId) && (
                        <MainButton type="button" className={styles.button} onClick={reportError}>
                            Report feedback
                        </MainButton>
                    )}
                    <MainButton type="button" className={styles.button} onClick={onBackToHomeButtonClick}>
                        Back to Home
                    </MainButton>
                </div>
            </div>

        </section>
    );
};

export default ErrorComponent;
