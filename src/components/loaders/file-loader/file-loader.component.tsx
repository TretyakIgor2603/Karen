import React, { ReactElement } from "react";
// Styles
import styles from "./file-uploader.module.css";
// TS types
type OwnProps = { children?: never }
type Props = OwnProps

const FileLoaderComponent = (props: Props): ReactElement<Props> => {
    return (
        <div className={styles.loader}>
            <span className="visually-hidden">Loading, please wait...</span>
        </div>
    );
};

export default FileLoaderComponent;
