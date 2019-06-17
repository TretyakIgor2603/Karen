import React from "react";
// Styles
import styles from "./preview.module.css";
// Images
import iconPDF from "./images/pdf-format.svg";
// TS types
type OwnProps = {
    file: File;
    children?: never;
}
type Props = OwnProps

const PreviewImageComponent = (props: Props): React.ReactElement<Props> => {
    const { file } = props;
    return (
        <div className={styles.preview}>
            <img
                src={(file.type === "application/pdf") ? iconPDF : URL.createObjectURL(file)}
                alt={file.name}
                className={styles.image}
            />
        </div>
    );
};

export default PreviewImageComponent;
