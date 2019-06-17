import React, { useEffect } from "react";
// Style
import styles from "./counter.module.css";
// TS types
import form from "redux-form";

type Props = {
    initialValue: number;
    autoFocus?: boolean;
    children?: never;
} & form.WrappedFieldProps

const CounterComponent = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        if (props.input.value === "" && props.initialValue) {
            props.input.onChange(props.initialValue);
        }
        // eslint-disable-next-line
    }, [props.initialValue]);

    const { input, autoFocus = false } = props;
    const { name, value, onChange, ...restInputProps } = input;
    const step = 1;
    const minValue = 0;

    const increment = (): void => onChange(parseInt(value, 10) + step);

    const decrement = (): void | number => {
        if (value <= minValue) return parseInt(value, 10);

        onChange(parseInt(value, 10) - step);
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
                value={+(value)}
                onChange={onChange}
                className={`text-ellipsis ${styles.field}`}
                autoFocus={autoFocus}
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

export default CounterComponent;
