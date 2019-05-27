import React, { ReactElement } from "react";
// Style
import styles from "./counter.module.css";
// Redux
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { incrementAction, decrementAction } from "./redux-duck/actions";
import { getCounterSelector } from "./redux-duck/selectors";
// Components
import { MainButton } from "../all-components";
import Form from "./components/test-form";
// TS types
import { ReduxState } from "../../redux/root-reducer";

type ReduxStateToProps = { counter: number }

type ReduxDispatchToProps = {
    increment: typeof incrementAction;
    decrement: typeof decrementAction;
}
type OwnProps = { children?: never }
type Props = OwnProps & ReduxStateToProps & ReduxDispatchToProps

const CounterComponent = (props: Props): ReactElement<Props> => {
    const onSubmitForm = (values: any): void => {
        console.log("🍆", { values });
    };

    return (
        <section className={styles.wrapper}>
            <h1 className="visually-hidden">Test component</h1>
            <Form onSubmit={onSubmitForm} />
            <header className={styles.header}>
                <p className={styles.subtitle}>Counter: {props.counter}</p>
            </header>
            <footer className={styles.footer}>
                <div className={styles["button-wrapper"]}>
                    <MainButton className={styles.button} onClick={props.increment}>Increment</MainButton>
                    <MainButton className={styles.button} onClick={props.decrement}>Decrement</MainButton>
                </div>
            </footer>
        </section>
    );
};

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    counter: getCounterSelector(state)
});

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    increment: () => dispatch(incrementAction()),
    decrement: () => dispatch(decrementAction())
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(CounterComponent);
