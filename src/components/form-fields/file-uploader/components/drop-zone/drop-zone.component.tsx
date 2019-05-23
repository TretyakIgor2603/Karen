import React, { ReactElement } from "react";
import cn from "classnames";
// Styles
import styles from "./drop-zone.module.css";
// Components
import FileUploadIcon from "./upload-file-icon.component";
// TS types
type Props = {
    isDragActive: boolean;
    children?: never;
}

const DropZoneComponent = (props: Props): ReactElement<Props> => {
    const { isDragActive } = props;

    const wrapperClassName = cn(`${styles.wrapper}`, {
        [styles["wrapper-drag-active"]]: isDragActive
    });

    return (
        <div className={wrapperClassName}>
            <div className={styles["icon-wrapper"]}>
                <FileUploadIcon />
            </div>
            <p className={styles.title}>
                <span className={`link ${styles.link}`}>Upload Photos</span> or just drag and drop
            </p>
            <p className={styles.subtitle}>
                + Add images of the space or inspirations
            </p>
        </div>
    );
};

export default DropZoneComponent;
