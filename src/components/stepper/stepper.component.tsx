import React, { useEffect, useState, Children, cloneElement, ReactElement, SyntheticEvent, ReactNode } from "react";
// Utils
import cn from "classnames";
import _get from "lodash/fp/get";
// Redux
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { registerStepsAction, allowNextStepAction } from "./redux-duck/actions";
// Styles
import styles from "./stepper.module.css";
import { ReduxState } from "../../redux/root-reducer";
import { Step } from "./types";
import { getStepsSelector } from "./redux-duck/selectors";
// TS types
type ReduxDispatchToProps = {
    registerSteps: typeof registerStepsAction;
    allowNextStep: typeof allowNextStepAction;
};
type ReduxStateToProps = { steps: Step[] }
type OwnProps = {
    children: ReactElement[];
    invalid: boolean;
    defaultStepIndex: number;
};
type Props = OwnProps & ReduxDispatchToProps & ReduxStateToProps;

const StepperComponent = (props: Props): ReactElement<Props> => {
    useEffect(() => {
        props.registerSteps(props.children);
        // eslint-disable-next-line
    }, []);
    const [currentStepIndex, setCurrentStepIndex] = useState(props.defaultStepIndex);
    const { children, invalid } = props;
    const step = 1;
    const minStepIndex = 0;
    const firstStep = currentStepIndex === minStepIndex;
    const lastStep = currentStepIndex === (children.length - 1);

    const onStepClick = (event: SyntheticEvent<HTMLLIElement>): void => {
        const { currentTarget } = event;
        const { dataset } = currentTarget;
        const stepIndex = Number(dataset.index);

        if (props.steps[stepIndex].disabled) return;
        setCurrentStepIndex(stepIndex);
    };

    const renderCurrentStepContent = (): ReactNode => children[currentStepIndex].props.children;

    const onNextButtonClick = (event: SyntheticEvent<HTMLAnchorElement>): void => {
        event && event.preventDefault && event.preventDefault();

        if (invalid || lastStep) return;
        if (props.steps[currentStepIndex].disabled) return;
        setCurrentStepIndex(currentStepIndex + step);
        props.allowNextStep(currentStepIndex + step);
    };

    const onPrevButtonClick = (event: SyntheticEvent<HTMLAnchorElement>): void => {
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
        [styles.disabled]: firstStep
    });

    const nextLinkClassNames = cn(styles["next-link"], {
        [styles.disabled]: invalid || lastStep
    });

    return (
        <div>
            <nav className={styles.navigation}>
                <ul className={styles["navigation-list"]}>
                    {renderNavigationWithStepApiAsProps}
                </ul>
            </nav>

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
                <a
                    href="#next"
                    className={nextLinkClassNames}
                    onClick={onNextButtonClick}
                >
                    Next
                </a>
            </div>
        </div>
    );
};

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    steps: getStepsSelector(state)
});
const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    registerSteps: (children) => dispatch(registerStepsAction(children)),
    allowNextStep: (stepIndex) => dispatch(allowNextStepAction(stepIndex))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(StepperComponent);