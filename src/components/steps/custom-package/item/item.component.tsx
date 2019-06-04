import React, { ReactElement } from "react";
// Styles
import styles from "./item.module.css";
// Components
import DefaultImage from "./images/picture.svg";
import { InputCounter } from "../../../all-components";
// TS types
import { WrappedFieldProps } from "redux-form";

type OwnProps = {
    title: string;
    image: string;
    initialValue: number;
    children?: never;
}
type Props = OwnProps & WrappedFieldProps

const ItemComponent = (props: Props): ReactElement<Props> => {
    const { image, title, initialValue, input } = props;

    return (
        <>
            <input
                {...input}
                className={`${styles.input} visually-hidden`}
                type="checkbox"
                id={`${input.name}-id`}
                checked={input.value}
            />
            <label className={styles.label} htmlFor={`${input.name}-id`}>
                <img
                    className={styles["item-image"]}
                    src={image ? image : DefaultImage}
                    alt={title}
                />
                <p className={styles["item-title"]}>{title}</p>
            </label>
            {input.value && (
                <div className={styles.counter}>
                    <InputCounter name={`${input.name}-count`} initialValue={initialValue} />
                </div>
            )}
        </>
    );
};

export default ItemComponent;
