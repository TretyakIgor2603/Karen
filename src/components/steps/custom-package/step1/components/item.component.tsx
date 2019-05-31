import React, { ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Components
import DefaultImage from "./images/picture.svg";
import { InputCounter } from "../../../../all-components";
// TS types
import { WrappedFieldProps } from "redux-form";

type OwnProps = {
    roomTitle: string;
    roomImage: string;
    children?: never;
}
type Props = OwnProps & WrappedFieldProps

const ItemComponent = (props: Props): ReactElement<Props> => {
    const { roomImage, roomTitle, input } = props;

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
                    className={styles["room-item-image"]}
                    src={roomImage ? roomImage : DefaultImage}
                    alt={roomTitle}
                />
                <p className={styles["room-item-title"]}>{roomTitle}</p>
            </label>
            {input.value && (
                <div className={styles.counter}>
                    <InputCounter name={`${input.name}-count`} initialValue={1} />
                </div>
            )}
        </>
    );
};

export default ItemComponent;
