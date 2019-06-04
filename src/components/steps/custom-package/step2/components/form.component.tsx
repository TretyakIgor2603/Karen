import React, { ComponentType, ReactElement } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../app-constants";
import { onFormSubmitStep2 } from "../../utils";
// Redux
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
// Components
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import FurnitureItem from "../../item/item.component";
import { MainLoader } from "../../../../all-components";
import { ReduxState } from "../../../../../redux/root-reducer";

// TS types
type OwnProps = { children?: never };
type ReduxStateToProps = {};
type Props = OwnProps & InjectedFormProps<{}, OwnProps> & ReduxStateToProps;

const FormComponent = (props: Props): ReactElement<Props> => {
    const { handleSubmit } = props;

    const furnitureBody = (
        <div>
            <Field
                name={"test-name"}
                component={FurnitureItem}
                title="test"
                image=""
                initialValue={1}
            />
        </div>
    );

    return (
        <form noValidate onSubmit={handleSubmit}>
            {false ? <MainLoader /> : furnitureBody}
        </form>
    );
};

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({});

export default compose<ComponentType<OwnProps>>(
    reduxForm<{}, OwnProps>({
        form: FormName.CustomPackageStep2,
        onSubmit: onFormSubmitStep2
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
