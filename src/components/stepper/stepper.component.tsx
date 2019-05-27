import React, { useState, Children, cloneElement, ReactElement, SyntheticEvent, ReactNode } from "react";
// Utils
import cn from "classnames";
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
    const firstStep = currentStepIndex === 0;
    const lastStep = currentStepIndex === (children.length - 1);

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

    const prevLinkClassNames = cn(styles["prev-link"], {
        [styles.disabled]: firstStep
    });

    const nextLinkClassNames = cn(styles["next-link"], {
        [styles.disabled]: lastStep
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

export default StepperComponent;
