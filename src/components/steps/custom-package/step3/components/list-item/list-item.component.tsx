import React from "react";
// Styles
import styles from "./list-item.module.css";
// Utils
import { defaultImageSrc } from "../../../../../../app-constants";
// TS types
import form from "redux-form";

type OwnProps = {
    label: string;
    image: string;
    children?: never;
}
type Props = OwnProps & form.WrappedFieldProps

const ListItemComponent = (props: Props): React.ReactElement<Props> => {
    const { image, input, label } = props;

    return (
        <>
            <input
                {...input}
                type="checkbox"
                className={`${styles.input} visually-hidden`}
                id={`${input.name}-id`}
                checked={input.value}
            />
            <label className={styles.label} htmlFor={`${input.name}-id`}>
                <div className={styles.promo}>
                    <img
                        className={styles.image}
                        src={image ? image : defaultImageSrc}
                        alt={label}
                    />
                </div>
                <div className={styles["promo-hover"]}>
                    <p className={styles.title}>
                        {label}
                    </p>
                </div>
            </label>
        </>
    );
};

export default ListItemComponent;
