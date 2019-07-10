import React from "react";
// Styles
import styles from "./form.module.css";
// Utils
import env from "../../../../../../env/env";
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep3 } from "../../../utils/submitting";
// Redux
import form, { Field, reduxForm } from "redux-form";
import redux, { connect } from "react-redux";
import { compose } from "redux";
import { getDesignStyleListSelector, getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { MainLoader } from "../../../../../all-components";
import ListItem from "../list-item/list-item.component";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";
import { DesignStyleRequest } from "../../../../../../types/custom-package";

type OwnProps = {
    onInputChange: (name: string) => void;
    children?: never;
};
type ReduxStateToProps = {
    isLoading: boolean;
    designStylesList: DesignStyleRequest;
};
type FormData = {
    [key: string]: boolean
};
type Props = OwnProps & form.InjectedFormProps<FormData, OwnProps> & ReduxStateToProps;

const FormComponent = (props: Props): React.ReactElement<Props> => {
    const { handleSubmit, isLoading, designStylesList, onInputChange } = props;
    const { is_logged, style_quiz, design_styles } = designStylesList;

    const designStylesBody = (design_styles && design_styles.length) ? (
        design_styles.map((designStyle) => {
            const name = `f_${designStyle.value}`;

            return (
                <li key={designStyle.value} className={styles["list-item"]}>
                    <Field
                        name={name}
                        image={designStyle.image_url.url}
                        label={designStyle.label}
                        onInputChange={onInputChange}
                        component={ListItem}
                    />
                </li>
            );
        })
    ) : null;

    return (
        <form noValidate onSubmit={handleSubmit}>
            {
                style_quiz && is_logged && (<p className={styles.text}>
                    We know your style based on your profile, but you can always
                    {" "}
                    <a
                        className={styles.link}
                        href={`${env.domain}/style-report/select-design-style`}>
                        edit your style profile
                    </a>
                </p>)
            }
            {
                isLoading ? (
                    <div className={styles.loader}>
                        <MainLoader />
                    </div>
                ) : (
                    <ul className={styles.list}>
                        {designStylesBody}
                    </ul>
                )
            }
        </form>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state),
    designStylesList: getDesignStyleListSelector(state)
});

export default compose<React.ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep3,
        onSubmit: onFormSubmitStep3
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
