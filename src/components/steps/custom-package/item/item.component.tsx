import React, { useEffect, useRef } from "react";
// Styles
import styles from "./item.module.css";
// Utils
import { defaultImageSrc } from "../../../../app-constants";
// Components
import { InputCounter } from "../../../all-components";
// TS types
import form from "redux-form";

type OwnProps = {
    title: string;
    image: string;
    initialValue: number;
    checked?: boolean;
    children?: never;
}
type Props = OwnProps & form.WrappedFieldProps

const ItemComponent = (props: Props): React.ReactElement<Props> => {
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
                    src={image ? image : defaultImageSrc}
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
