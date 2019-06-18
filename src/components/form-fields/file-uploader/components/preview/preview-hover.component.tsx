import React from "react";
import styles from "./preview.module.css";
// Components
import DeleteButtonIcon from "./delete-button-icon.component";
// TS types
type OwnProps = {
    onDeletePreviewButtonClick: (event: React.SyntheticEvent<any>) => void;
    fileSize: number;
    fileName: string;
    id: string | number;
    children?: never;
}
type Props = OwnProps

const PreviewHoverComponent = (props: Props): React.ReactElement<Props> => {
    const { id, fileName, fileSize, onDeletePreviewButtonClick } = props;

    return (
        <div className={styles["item-hover"]}>
            <button
                type="button"
                data-id={id}
                className={styles["remove-button"]}
                onClick={onDeletePreviewButtonClick}
            >
                <DeleteButtonIcon />
                <span className="visually-hidden">Delete preview</span>
            </button>
            <p className={`text-ellipsis ${styles.subtitle}`}>
                <strong>{fileSize}</strong> KB
            </p>
            <p className={`text-ellipsis ${styles.subtitle}`}>{fileName}</p>
        </div>
    );
};

export default PreviewHoverComponent;
