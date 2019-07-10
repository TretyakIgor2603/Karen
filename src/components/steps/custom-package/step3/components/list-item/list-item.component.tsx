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
    onInputChange?: (name: string) => void;
    children?: never;
}
type Props = OwnProps & form.WrappedFieldProps

const ListItemComponent = (props: Props): React.ReactElement<Props> => {
    const {
        image,
        input: {
            name,
            value,
            onChange,
            ...restInputProps
        },
        onInputChange,
        label
    } = props;

    const handleInputChange: React.FormEventHandler<HTMLInputElement> = (event) => {
        if (onInputChange) {
            onInputChange(name);
        } else {
            onChange(event, value);
        }
    };

    return (
        <>
            <input
                {...restInputProps}
                onChange={handleInputChange}
                type="checkbox"
                className={`${styles.input} visually-hidden`}
                id={`${name}-id`}
                checked={value}
                value={value}
            />
            <label className={styles.label} htmlFor={`${name}-id`}>
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
