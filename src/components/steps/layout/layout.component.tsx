import React, { ReactElement, ReactNode } from "react";
// Styles
import styles from "./layout.module.css";
// TS types
type OwnProps = {
    title: string;
    children: ReactNode;
}
type Props = OwnProps

const LayoutComponent = (props: Props): ReactElement<Props> => {
    const { title, children } = props;

    return (
        <section className={styles.wrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.content}>{children}</div>
        </section>
    );
};

export default LayoutComponent;
