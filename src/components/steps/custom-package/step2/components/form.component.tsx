import React, { useState } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { get, set } from "local-storage";
import { FormName } from "../../../../../app-constants";
import { CustomPackage, onFormSubmitStep2 } from "../../utils/submitting";
// Redux
import form, { reduxForm } from "redux-form";
import redux, { connect } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector, makeGetFurnitureListSelector } from "../../redux-duck/selectors";
// Components
import { MainLoader, HiddenInput } from "../../../../all-components";
import FurnitureList from "./furniture-list.component";
// TS types
import { FilterFurniture } from "../../../../../types/custom-package";
import { ReduxState } from "../../../../../redux/root-reducer";

type OwnProps = { children?: never };
type ReduxStateToProps = {
    isLoading: boolean,
    furnitureList: FilterFurniture[];
};
type FormData = {
    [key: string]: boolean | string | number
};
type Props = OwnProps & form.InjectedFormProps<FormData, OwnProps> & ReduxStateToProps;

const FormComponent = (props: Props): React.ReactElement<Props> => {
    const [isOpen, setIsOpen] = useState<{ [x: string]: boolean }>(get(CustomPackage.CustomPackageStep2OpenOther) || {});

    const { handleSubmit, isLoading, furnitureList } = props;

    const onButtonSubtitleClick: React.ReactEventHandler<HTMLButtonElement> = (event) => {
        const { dataset } = event.target as HTMLButtonElement;
        const newIsOpen = {
            ...isOpen,
            [`${dataset.furniture}`]: !isOpen[`${dataset.furniture}`]
        };
        setIsOpen(newIsOpen);
        set(CustomPackage.CustomPackageStep2OpenOther, newIsOpen);
    };

    const furnitureBody = furnitureList.map((furniture) => (
        <div className={styles.wrapper} key={furniture.label}>
            <HiddenInput name={furniture.label} initialValue={furniture.category_room_id} />
            <h2 className={styles.title}>
                {furniture.label}
            </h2>
            <p className={styles.subtitle}>Essentials</p>
            <FurnitureList
                furniture={furniture.essentials}
                category={furniture.label}
            />
            <button
                type="button"
                data-furniture={furniture.label}
                className={styles.subtitle}
                onClick={onButtonSubtitleClick}
            >
                Others +
            </button>
            {isOpen[furniture.label] && (
                <FurnitureList
                    furniture={furniture.others}
                    category={furniture.label}
                    checked={false}
                    initialValue={1}
                />
            )}
        </div>
    ));

    return (
        <form noValidate onSubmit={handleSubmit}>
            {isLoading ? <div className={styles.loader}><MainLoader /></div> : furnitureBody}
        </form>
    );
};

const makeMapStateToProps = () => {
    const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => {
        const getFurnitureListSelector = makeGetFurnitureListSelector();

        return {
            isLoading: getLoadingSelector(state),
            furnitureList: getFurnitureListSelector(state)
        };
    };

    return mapStateToProps;
};

export default compose<React.ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep2,
        onSubmit: onFormSubmitStep2
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(makeMapStateToProps)
)(FormComponent);
