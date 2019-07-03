import React, { Component } from "react";
// Styles
import styles from "./modal.module.css";
// Redux
import { closePopupAction } from "./redux-duck/actions";
import redux, { connect } from "react-redux";
// Utils
import { ReduxState } from "../../redux/root-reducer";
// TS types
type OwnProps = {
    children: React.ReactElement;
    title: string;
    onClick?: () => void
}

type ReduxDispatchToProps = {
    closeModal: typeof closePopupAction
}

type Props = OwnProps & ReduxDispatchToProps

type State = {}

const initialState: State = Object.freeze({});

class ModalComponent extends Component<Props, State> {
    state = initialState;

    render(): React.ReactElement {
        const { children, title } = this.props;

        return (
            <section className={styles["modal-wrapper"]} onClick={this.handlerOverlayClick}>
                <div className={styles["modal-content"]}>
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            {title}
                        </h1>
                        <button className={styles["button-close"]} type="button" onClick={this.onButtonClose}>
                            <span className="visually-hidden">Close modal</span>
                        </button>
                    </header>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </section>
        );
    }

    componentDidMount(): void {
        document.addEventListener("keyup", this.handlerKeyUp);
    }

    componentWillUnmount(): void {
        document.removeEventListener("keyup", this.handlerKeyUp);
    }

    onButtonClose = (): void => {
        const { onClick, closeModal } = this.props;

        if (onClick) {
            onClick();
        }

        closeModal();
    };

    handlerKeyUp = (event: KeyboardEvent): void => {
        event && event.preventDefault && event.preventDefault();
        const { code } = event;
        const { closeModal } = this.props;

        if (code === "Escape") closeModal();
    };

    handlerOverlayClick: React.MouseEventHandler<HTMLElement> = (event) => {
        const { target, currentTarget } = event;
        const { closeModal } = this.props;

        if (target === currentTarget) {
            closeModal();
        }
    };
}

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    closeModal: () => dispatch(closePopupAction())
});

export default connect<{}, ReduxDispatchToProps, OwnProps, ReduxState>(null, mapDispatchToProps)(ModalComponent);
