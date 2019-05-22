import React, { memo, ReactElement } from "react";
// Style
import styles from "./counter.module.css";
// TS types
import { WrappedFieldProps } from "redux-form";

type Props = { children?: never } & WrappedFieldProps

const CounterComponent = (props: Props): ReactElement<Props> => {
    const { input } = props;
    const { name, value, onChange, ...restInputProps } = input;
    const step = 1;
    const minValue = 0;

    const increment = (): void => onChange(Number(value) + step);

    const decrement = (): void | number => {
        if (value <= minValue) return Number(value);

        onChange(Number(value) - step);
    };

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={styles["button-minus"]}
                onClick={decrement}
                disabled={value <= minValue}
            >
                <span className="visually-hidden">Minus one</span>
            </button>
            <input
                {...restInputProps}
                name={name}
                type="number"
                min={minValue}
                step={step}
                value={value}
                onChange={onChange}
                className={`text-ellipsis ${styles.field}`}
            />
            <button
                type="button"
                className={styles["button-plus"]}
                onClick={increment}
            >
                <span className="visually-hidden">Plus one</span>
            </button>
        </div>
    );
};

export default memo(CounterComponent);
