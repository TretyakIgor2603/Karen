import React, { useEffect, useRef } from "react";
// Styles
import styles from "./item.module.css";
// Utils
import { defaultImageSrc } from "../../../../app-constants";
import cn from "classnames";
// Components
import { InputCounter } from "../../../all-components";
// Redux
import redux, { connect } from "react-redux";
import form, { change, formValueSelector } from "redux-form";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";

type ReduxStateToProps = {
    counterValue: number | string;
}
type ReduxDispatchToProps = {
    change: typeof change;
}
type OwnProps = {
    title: string;
    image: string;
    initialValue: number;
    checked?: boolean;
    children?: never;
} & form.WrappedFieldProps
type Props = OwnProps & form.WrappedFieldProps & ReduxStateToProps & ReduxDispatchToProps;

const ItemComponent = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        if (props.checked) { props.input.onChange(true); }
        // eslint-disable-next-line
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    const { image, title, initialValue, input, meta, counterValue } = props;

    const checkboxClassName = cn(
        "visually-hidden",
        styles.input, {
            [styles.counterZeroValue]: counterValue === 0 || !input.value
        });

    const onLabelClick = (event: React.SyntheticEvent<HTMLLabelElement>) => {
        event && event.preventDefault && event.preventDefault();
        if (counterValue && counterValue > 0) {
            props.change(meta.form, input.name, !input.value);
        } else if (input.value && counterValue === 0) {
            props.change(meta.form, `${input.name}-count`, 1);
            props.change(meta.form, input.name, true);
        } else if (counterValue === 0) {
            props.change(meta.form, `${input.name}-count`, 1);
        } else if (props.checked) {
            props.change(meta.form, input.name, true);
        } else {
            props.change(meta.form, input.name, !input.value);
        }
    };

    return (
        <div className={styles.wrapper}>
            <input
                {...input}
                ref={inputRef}
                className={checkboxClassName}
                type="checkbox"
                id={`${input.name}-id`}
                checked={input.value}
            />
            <label className={styles.label} htmlFor={`${input.name}-id`} onClick={onLabelClick}>
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
                        autoFocus={Boolean(inputRef.current && inputRef.current.checked)}
                    />
                </div>
            )}
        </div>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state, ownProps) => {
    const selector = formValueSelector(ownProps.meta.form);

    return {
        counterValue: parseInt(selector(state, `${ownProps.input.name}-count`), 10)
    };
};

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    change: (formName: string, formField: string, value: any): form.FormAction => dispatch(change(formName, formField, value))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(ItemComponent);
