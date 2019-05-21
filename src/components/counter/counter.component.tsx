import React, { ReactElement } from "react";
// Style
import styles from "./counter.module.css";
// Redux
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { incrementAction, decrementAction } from "./redux-duck/actions";
import { getCounterSelector } from "./redux-duck/selectors";
// Components
import { MainButton } from "../all-components";
// TS types
import { ReduxState } from "../../redux/root-reducer";
import { ReduxActions } from "../../redux/root-actions-type";

type MapStateToProps = { counter: number }
type MapDispatchToProps = {
    increment: typeof incrementAction;
    decrement: typeof decrementAction;
}
type Props = { children?: never } & MapStateToProps & MapDispatchToProps

const CounterComponent = (props: Props): ReactElement<Props> => {
    return (
        <section className={styles.wrapper}>
            <h1 className="visually-hidden">Test component</h1>
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

const mapStateToProps = (state: ReduxState): MapStateToProps => ({
    counter: getCounterSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ReduxActions>): MapDispatchToProps => ({
    increment: () => dispatch(incrementAction()),
    decrement: () => dispatch(decrementAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
