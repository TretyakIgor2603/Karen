import React, { useState, ComponentType, ReactElement, ReactEventHandler } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { FormName } from "../../../../../app-constants";
import { onFormSubmitStep2 } from "../../utils";
// Redux
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector } from "../../redux-duck/selectors";
// Components
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import FurnitureItem from "../../item/item.component";
import { MainLoader } from "../../../../all-components";
import { ReduxState } from "../../../../../redux/root-reducer";
// TS types
type OwnProps = { children?: never };
type ReduxStateToProps = {
    isLoading: boolean
};
type Props = OwnProps & InjectedFormProps<{}, OwnProps> & ReduxStateToProps;

const FormComponent = (props: Props): ReactElement<Props> => {
    const [isOpen, setIsOpen] = useState(false);
    const { handleSubmit, isLoading } = props;

    const onButtonSubtitleClick: ReactEventHandler<HTMLButtonElement> = () => setIsOpen(!isOpen);

    const furnitureBody = (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Living Room</h2>
            <p className={styles.subtitle}>Essentials</p>
            <ul className={styles.list}>
                <li className={styles["list-item"]}>
                    <Field
                        name={"test-name"}
                        component={FurnitureItem}
                        title="test"
                        image=""
                        initialValue={1}
                    />
                </li>
            </ul>

            <button type="button" className={styles.subtitle} onClick={onButtonSubtitleClick}>
                Others +
            </button>
            {isOpen && <ul className={styles.list}>
                <li className={styles["list-item"]}>
                    <Field
                        name={"test-name-2"}
                        component={FurnitureItem}
                        title="test-2"
                        image=""
                        initialValue={1}
                    />
                </li>
            </ul>}
        </div>
    );

    return (
        <form noValidate onSubmit={handleSubmit}>
            {isLoading ? <div className={styles.loader}><MainLoader /></div> : furnitureBody}
        </form>
    );
};

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state)
});

export default compose<ComponentType<OwnProps>>(
    reduxForm<{}, OwnProps>({
        form: FormName.CustomPackageStep2,
        onSubmit: onFormSubmitStep2
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
