import React, { ReactElement } from "react";
// Style
import classes from "./counter.module.css";
// Redux
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { incrementAction, decrementAction } from "./redux-duck/actions";
import { getCounterSelector } from "./redux-duck/selectors";
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
        <section className={classes.wrapper}>
            <h1 className="visually-hidden">Test component</h1>
            <header className={classes.header}>
                <p className={classes.subtitle}>Counter: {props.counter}</p>
            </header>
            <footer className={classes.footer}>
                <div className={classes["button-wrapper"]}>
                    <button className="button" onClick={props.increment}>Increment</button>
                    <button className="button" onClick={props.decrement}>Decrement</button>
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
