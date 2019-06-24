import React, { useEffect, useState, Children, cloneElement } from "react";
// Utils
import cn from "classnames";
import _get from "lodash/fp/get";
import { disableNextButton } from "./utils/step-validator";
import { useMedia } from "the-platform";
// Redux
import { ReduxState } from "../../redux/root-reducer";
import { getStepsSelector } from "./redux-duck/selectors";
import redux, { connect } from "react-redux";
import { registerStepsAction, allowNextStepAction } from "./redux-duck/actions";
import { submit } from "redux-form";
// Styles
import styles from "./stepper.module.css";

// TS types
import { Step } from "../../types/stepper";

type ReduxDispatchToProps = {
    registerSteps: typeof registerStepsAction;
    allowNextStep: typeof allowNextStepAction;
    formSubmit: typeof submit;
};
type ReduxStateToProps = {
    steps: Step[];
    form: any;
}
type OwnProps = {
    children: React.ReactElement[];
    defaultStepIndex: number;
};
type Props = OwnProps & ReduxDispatchToProps & ReduxStateToProps;

const StepperComponent = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        props.registerSteps(props.children);
        // eslint-disable-next-line
    }, []);
    const [currentStepIndex, setCurrentStepIndex] = useState(props.defaultStepIndex);
    const [passStepIndex, setPassStepIndex] = useState(1);
    const { children } = props;
    const isDisabledNextButton = disableNextButton(props.form);
    const step = 1;
    const minStepIndex = 0;
    const firstStep = currentStepIndex === minStepIndex;
    const lastStep = currentStepIndex === (children.length - 1);
    const quantity = children.length;

    const onStepClick = (event: React.SyntheticEvent<HTMLLIElement>): void => {
        const { currentTarget } = event;
        const { dataset } = currentTarget;
        const stepIndex = Number(dataset.index);

        if (props.steps[stepIndex].disabled) return;
        setCurrentStepIndex(stepIndex);
    };

    const renderCurrentStepContent = (): React.ReactNode => children[currentStepIndex].props.children;

    const onNextButtonClick = (event: React.SyntheticEvent<HTMLAnchorElement>): void => {
        event && event.preventDefault && event.preventDefault();

        if (isDisabledNextButton || lastStep) return;
        if (props.steps[currentStepIndex].disabled) return;
        Promise.resolve(props.formSubmit(Object.keys(props.form)[0]))
            .then(() => {
                setCurrentStepIndex(currentStepIndex + step);
                props.allowNextStep(currentStepIndex + step);
                setPassStepIndex(currentStepIndex + step + 1);
            });
    };

    const onPrevButtonClick = (event: React.SyntheticEvent<HTMLAnchorElement>): void => {
        event && event.preventDefault && event.preventDefault();

        if (!(currentStepIndex > minStepIndex)) return;
        setCurrentStepIndex(currentStepIndex - step);
    };

    const renderNavigationWithStepApiAsProps = Children.map(children, (child, index) => {
        const disabledChild = _get(`steps[${index}].disabled`, props);

        return cloneElement(child, {
            onClick: onStepClick,
            stepIndex: index,
            isActive: index === currentStepIndex,
            isPass: _get(`steps[${index}].pass`, props),
            isDisabled: (disabledChild !== void 0) ? disabledChild : !(index === 0)
        });
    });

    const prevLinkClassNames = cn(styles["prev-link"], {
        [styles.disabled]: firstStep,
        [styles["last-step"]]: lastStep
    });

    const nextLinkClassNames = cn(styles["next-link"], {
        [styles.disabled]: isDisabledNextButton || lastStep
    });

    const lineStyle = {
        height: "3px",
        marginRight: `${100 / quantity * (quantity - passStepIndex)}%`,
        marginLeft: "-20px",
        backgroundColor: "#c49f68",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
    };

    const viewport = useMedia("(max-width: 1314px)");

    return (
        <div>
            <nav className={styles.navigation}>
                <ul className={styles["navigation-list"]}>
                    {renderNavigationWithStepApiAsProps}
                </ul>
            </nav>

            {viewport && (
                <div className={styles.progress}>
                    <div style={lineStyle} />
                    <span className="visually-hidden">Progress bar</span>
                </div>
            )}

            <div>
                {renderCurrentStepContent()}
            </div>

            <div className={styles["links-block-wrapper"]}>
                <a
                    href="#prev"
                    className={prevLinkClassNames}
                    onClick={onPrevButtonClick}
                >
                    Back
                </a>
                {
                    !lastStep && (
                        <a
                            href="#next"
                            className={nextLinkClassNames}
                            onClick={onNextButtonClick}
                        >
                            Next
                        </a>
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    steps: getStepsSelector(state),
    form: state.form
});
const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    registerSteps: (children) => dispatch(registerStepsAction(children)),
    allowNextStep: (stepIndex) => dispatch(allowNextStepAction(stepIndex)),
    formSubmit: (formName) => dispatch(submit(formName))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(StepperComponent);
