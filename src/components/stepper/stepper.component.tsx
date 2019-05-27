import React, { useState, Children, cloneElement, ReactElement, SyntheticEvent, ReactNode } from "react";
// Styles
import styles from "./stepper.module.css";
// TS types
type OwnProps = {
    children: ReactElement[];
    defaultStepIndex: number;
}
type Props = OwnProps

const StepperComponent = (props: Props): ReactElement<Props> => {
    const [currentStepIndex, setCurrentStepIndex] = useState(props.defaultStepIndex);
    const { children } = props;
    const step = 1;
    const minStepIndex = 0;

    const onStepClick = (event: SyntheticEvent<HTMLLIElement>): void => {
        const { currentTarget } = event;
        const { dataset } = currentTarget;
        setCurrentStepIndex(Number(dataset.index));
    };

    const renderCurrentStepContent = (): ReactNode => children[currentStepIndex].props.children;

    const onNextButtonClick = (event: SyntheticEvent<HTMLAnchorElement>): void => {
        event && event.preventDefault && event.preventDefault();

        if (!(currentStepIndex < children.length - 1)) return;
        setCurrentStepIndex(currentStepIndex + step);
    };

    const onPrevButtonClick = (event: SyntheticEvent<HTMLAnchorElement>): void => {
        event && event.preventDefault && event.preventDefault();

        if (!(currentStepIndex > minStepIndex)) return;
        setCurrentStepIndex(currentStepIndex - step);
    };

    const renderNavigationWithStepApiAsProps = Children.map(children, (child, index) => {
        return cloneElement(child, {
            onClick: onStepClick,
            stepIndex: index,
            isActive: index === currentStepIndex,
            isPass: currentStepIndex > index,
            isDisabled: index > currentStepIndex
        });
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

            <div>
                <a href="#" onClick={onPrevButtonClick}>Prev</a>
                <a href="#" onClick={onNextButtonClick}>Next</a>
            </div>
        </div>
    );
};

export default StepperComponent;
