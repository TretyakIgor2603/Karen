import React from "react";
import cn from "classnames";
// Styles
import styles from "./drop-zone.module.css";
// Components
import FileUploadIcon from "./upload-file-icon.component";
import Preview from "../preview/preview.component";
// TS types
type Props = {
    isDragReject: boolean;
    isDragActive: boolean;
    formName: string;
    name: string;
    children?: never;
}

const DropZoneComponent = (props: Props): React.ReactElement<Props> => {
    const { isDragReject, isDragActive, formName, name } = props;

    const wrapperClassName = cn(`${styles.wrapper}`, {
        [styles["wrapper-drag-active"]]: isDragActive,
        [styles["wrapper-drag-reject"]]: isDragReject
    });

    return (
        <div className={wrapperClassName}>
            <Preview formName={formName} name={name} />
            <div className={styles["icon-wrapper"]}>
                <FileUploadIcon />
            </div>
            <p className={styles.title}>
                <span className={`link ${styles.link}`}>Upload Photos</span> or just drag and drop
            </p>
            <p className={styles.subtitle}>
                + Add images of the space or inspirations
            </p>
            {isDragReject && (
                <p className={styles["subtitle-reject"]}>You can upload pdf files and all image file formats</p>
            )}
        </div>
    );
};

export default DropZoneComponent;
