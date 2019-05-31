import React, { ReactElement } from "react";
// Styles
import styles from "./main-loader.module.css";
// TS types
type OwnProps = { children?: never }
type Props = OwnProps

const MainLoaderComponent = (props: Props): ReactElement<Props> => {
    return (
        <div className={styles.dots}>
            <div />
            <div />
            <div />
        </div>
    );
};

export default MainLoaderComponent;
