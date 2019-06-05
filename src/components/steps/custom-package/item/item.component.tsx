import React, { useEffect, useRef, ReactElement } from "react";
// Styles
import styles from "./item.module.css";
// Components
import { InputCounter } from "../../../all-components";
// TS types
import { WrappedFieldProps } from "redux-form";

type OwnProps = {
    title: string;
    image: string;
    initialValue: number;
    checked?: boolean;
    children?: never;
}
type Props = OwnProps & WrappedFieldProps

const ItemComponent = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        if (props.checked) { props.input.onChange(true); }
        // eslint-disable-next-line
    }, []);
    const inputRef = useRef<HTMLInputElement>(null);

    const { image, title, initialValue, input } = props;

    return (
        <>
            <input
                {...input}
                ref={inputRef}
                className={`${styles.input} visually-hidden`}
                type="checkbox"
                id={`${input.name}-id`}
                checked={input.value}
            />
            <label className={styles.label} htmlFor={`${input.name}-id`}>
                <img
                    className={styles["item-image"]}
                    src={image ? image : "https://gofourwalls.s3.amazonaws.com/globalimages/icons/categories/default.svg"}
                    alt={title}
                />
                <p className={styles["item-title"]}>{title}</p>
            </label>
            {input.value && (
                <div className={styles.counter}>
                    <InputCounter
                        name={`${input.name}-count`}
                        initialValue={initialValue}
                        autoFocus={!!(inputRef.current && inputRef.current.checked)}
                    />
                </div>
            )}
        </>
    );
};

export default ItemComponent;
