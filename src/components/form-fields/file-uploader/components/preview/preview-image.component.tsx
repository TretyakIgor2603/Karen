import React from "react";
// Styles
import styles from "./preview.module.css";
// TS types
type OwnProps = {
    src: string;
    alt: string;
    children?: never;
}
type Props = OwnProps

const PreviewImageComponent = (props: Props): React.ReactElement<Props> => {
    const { src, alt } = props;
    return (
        <div className={styles.preview}>
            <img
                src={src}
                alt={alt}
                className={styles.image}
            />
        </div>
    );
};

export default PreviewImageComponent;
