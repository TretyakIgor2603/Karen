import React, { useEffect } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../../app-constants";
import { CustomPackage, onFormSubmitStep5 } from "../../../utils/submitting";
import { get, set } from "local-storage";
// Redux
import form, { reduxForm } from "redux-form";
import redux, { connect } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector, makeGetPriceSelector } from "../../../redux-duck/selectors";
// Components
import { Range, createSliderWithTooltip } from "rc-slider";
import { MainLoader } from "../../../../../all-components";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";
import { MiddlePrice } from "../../../../../../types/custom-package";

const RangeTooltip = createSliderWithTooltip(Range);

type OwnProps = { children?: never; };
type ReduxStateToProps = {
    isLoading: boolean;
    middlePrice: MiddlePrice;
};
type FormData = {
    BudgetString: string
};
type Props = OwnProps & ReduxStateToProps & form.InjectedFormProps<FormData, OwnProps>;

const generateMarks = (min: number, max: number, step: number): { [key: string]: string } => {
    const marks: { [key: string]: string } = {};

    marks[min.toString()] = min.toString();
    marks[max.toString()] = max.toString();

    const countMarks = Math.floor(max / step);

    if (countMarks) {
        for (let i = 1; i <= countMarks; i++) {
            const value = i * step;

            if (value > min) {
                marks[value.toString()] = value.toString();
            }
        }
    }

    return marks;
};

const FormComponent = (props: Props): React.ReactElement<Props> => {
    useEffect(() => {
        const range: number[] | undefined = get(CustomPackage.CustomPackageStep5);
        if (!range || (range[0] === 0 && range[1] === 0)) {
            set(CustomPackage.CustomPackageStep5, [props.middlePrice.handleMin, props.middlePrice.handleMax]);
        }
    }, [props]);

    const { handleSubmit, isLoading, middlePrice } = props;

    const marks = generateMarks(middlePrice.rangeMin, middlePrice.rangeMax, middlePrice.step);
    const range: number[] | undefined = get(CustomPackage.CustomPackageStep5);

    const setValue = (range: number[]): void => {
        set(CustomPackage.CustomPackageStep5, range);
    };

    const tipFormatter = (value: number): string => `${value}$`;

    return (
        <form noValidate onSubmit={handleSubmit}>
            {
                isLoading ? (
                    <div className={styles.loader}>
                        <MainLoader />
                    </div>
                ) : (
                    <RangeTooltip
                        tipFormatter={tipFormatter}
                        marks={marks}
                        defaultValue={(range && (range[0] !== 0 && range[1] !== 0)) ? range : [middlePrice.handleMin, middlePrice.handleMax]}
                        min={middlePrice.rangeMin}
                        max={middlePrice.rangeMax}
                        step={middlePrice.step}
                        pushable={middlePrice.pushable}
                        onChange={setValue}
                    />
                )
            }
        </form>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => {
    const getMiddlePriceSelector = makeGetPriceSelector();

    return {
        isLoading: getLoadingSelector(state),
        middlePrice: getMiddlePriceSelector(state)
    };
};

export default compose<React.ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep5,
        onSubmit: onFormSubmitStep5
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
