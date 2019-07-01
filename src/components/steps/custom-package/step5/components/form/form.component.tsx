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
import { getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { Range, createSliderWithTooltip } from "rc-slider";
import { MainLoader } from "../../../../../all-components";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";

const RangeTooltip = createSliderWithTooltip(Range);

type OwnProps = { children?: never; };
type ReduxStateToProps = {
    isLoading: boolean;
};
type FormData = {
    BudgetString: string
};
type Props = OwnProps & ReduxStateToProps & form.InjectedFormProps<FormData, OwnProps>;

const generateMarks = (min: number, max: number): { [key: string]: string } => {
    const marks: { [key: string]: string } = {};
    const STEP: number = 500;

    marks[min.toString()] = min.toString();
    marks[max.toString()] = max.toString();

    const countMarks = Math.floor(max / STEP);

    if (countMarks) {
        for (let i = 1; i <= countMarks; i++) {
            const value = i * STEP;

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
        if (!range) {
            set(CustomPackage.CustomPackageStep5, [3000, 7000]);
        }
    }, []);
    const { handleSubmit, isLoading } = props;
    const MID_PRICE = 5000;
    const MIN_VALUE = Math.ceil(MID_PRICE - MID_PRICE * 50 / 100);
    const MAX_VALUE = Math.ceil(MID_PRICE + MID_PRICE * 50 / 100);
    const marks = generateMarks(MIN_VALUE, MAX_VALUE);
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
                        defaultValue={(range && range.length) ? range : [3000, 7000]}
                        min={MIN_VALUE}
                        max={MAX_VALUE}
                        step={500}
                        pushable={1000}
                        onChange={setValue}
                    />
                )
            }
        </form>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state)
});

export default compose<React.ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep5,
        onSubmit: onFormSubmitStep5
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
