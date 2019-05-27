import React, { ReactElement, ReactNode } from "react";
// Utils
import cn from "classnames";
// Styles
import styles from "./step.module.css";
// TS types
type OwnProps = {
    title: string;
    onClick?: any;
    stepIndex?: number;
    isPass?: number;
    isActive?: boolean;
    isDisabled?: boolean;
    children: ReactNode;
}
type Props = OwnProps

const StepComponent = (props: Props): ReactElement<Props> => {
    const { onClick, stepIndex = 0, title, isPass, isActive, isDisabled } = props;

    const navigationItemClassName = cn(styles["navigation-item"], {
        [styles["current"]]: isActive,
        [styles["pass"]]: isPass,
        [styles["disabled"]]: isDisabled
    });

    return (
        <li onClick={onClick} data-index={stepIndex} className={navigationItemClassName}>
            <p className={styles["step"]}>{stepIndex + 1}</p>
            <p className={styles["step-title"]}>{title}</p>
        </li>
    );
};

export default StepComponent;
