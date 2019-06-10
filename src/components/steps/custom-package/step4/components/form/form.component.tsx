import React, { ComponentType, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep4 } from "../../../utils";
// Redux
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { MainLoader } from "../../../../../all-components";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";

type OwnProps = { children?: never; };
type ReduxStateToProps = {
    isLoading: boolean;
};
type Props = OwnProps & ReduxStateToProps & InjectedFormProps<{}, OwnProps>;

const FormComponent = (props: Props): ReactElement<Props> => {
    const { handleSubmit, isLoading } = props;

    return (
        <form noValidate onSubmit={handleSubmit}>
            {
                isLoading ? (
                    <div className={styles.loader}>
                        <MainLoader />
                    </div>
                ) : (
                    <>
                        <ul>
                            <li>Q1: reason for this project:
                                <ol>
                                    select from:
                                    <li>investment property</li>
                                    <li>moving for work</li>
                                    <li>first home</li>
                                    <li>redecorating</li>
                                </ol>
                            </li>
                            <li>Q2: which city will this property be in?</li>
                            <li>Q3: when do you need this property furnished?
                                <ol>
                                    select from:
                                    <li>within 1 month</li>
                                    <li>in 2-3 months</li>
                                    <li>3 months</li>
                                    <li>later</li>
                                    <li>no plan to move</li>
                                </ol>
                            </li>
                            <li>Q4: how many people (max) will live in the property?</li>
                            <li>Q5: allow user to upload files in image formats and pdf</li>
                        </ul>
                    </>
                )
            }
        </form>
    );
};

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state)
});

export default compose<ComponentType<OwnProps>>(
    reduxForm<{}, OwnProps>({
        form: FormName.CustomPackageStep4,
        onSubmit: onFormSubmitStep4
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
