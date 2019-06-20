import React, { useEffect, useRef } from "react";
// Styles
import styles from "./item.module.css";
// Utils
import { defaultImageSrc } from "../../../../app-constants";
import cn from "classnames";
// Components
import { InputCounter } from "../../../all-components";
// Redux
import { connect, MapStateToProps } from "react-redux";
import { getFormValues } from "redux-form";
// TS types
import form from "redux-form";
import { ReduxState } from "../../../../redux/root-reducer";

type ReduxStateToProps = {
    formValues: any
}

type OwnProps = {
    title: string;
    image: string;
    initialValue: number;
    checked?: boolean;
    children?: never;
} & form.WrappedFieldProps
type Props = OwnProps & form.WrappedFieldProps & ReduxStateToProps;

const ItemComponent = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        if (props.checked) { props.input.onChange(true); }
        // eslint-disable-next-line
    }, []);
    const inputRef = useRef<HTMLInputElement>(null);

    const { image, title, initialValue, input, formValues } = props;
    const counterValue = formValues && formValues[`${input.name}-count`];

    const checkboxClassName = cn("visually-hidden", styles.input, {
        [styles.counterZeroValue]: counterValue === 0
    });

    return (
        <>
            <input
                {...input}
                ref={inputRef}
                className={checkboxClassName}
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

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state, ownProps) => ({
    formValues: getFormValues(ownProps.meta.form)(state)
});

export default connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)(ItemComponent);
