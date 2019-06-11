import React, { ComponentType, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import _snakeCase from "lodash/fp/snakeCase";
import env from "../../../../../../env/env";
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep3 } from "../../../utils";
// Redux
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getDesignStyleListSelector, getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { MainLoader } from "../../../../../all-components";
import ListItem from "../list-item/list-item.component";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";
import { DesignStyleRequest } from "../../../types";

type OwnProps = { children?: never };
type ReduxStateToProps = {
    isLoading: boolean;
    designStylesList: DesignStyleRequest;
};
type FormData = {
    [key: string]: boolean
};
type Props = OwnProps & InjectedFormProps<FormData, OwnProps> & ReduxStateToProps;

const FormComponent = (props: Props): ReactElement<Props> => {
    const { handleSubmit, isLoading, designStylesList } = props;
    const { is_logged, style_quiz, design_styles } = designStylesList;

    const designStylesBody = (design_styles && design_styles.length) ? (
        design_styles.map((designStyle) => {
            const name = _snakeCase(designStyle.label);

            return (
                <li key={designStyle.value} className={styles["list-item"]}>
                    <Field
                        name={name}
                        image={designStyle.image_url.url}
                        label={designStyle.label}
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

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state),
    designStylesList: getDesignStyleListSelector(state)
});

export default compose<ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep3,
        onSubmit: onFormSubmitStep3
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
