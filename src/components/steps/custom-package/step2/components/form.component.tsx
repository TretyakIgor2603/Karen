import React, { useState, ComponentType, ReactElement, ReactEventHandler } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import { get, set } from "local-storage";
import { FormName } from "../../../../../app-constants";
import { CustomPackage, onFormSubmitStep2 } from "../../utils";
// Redux
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector, makeGetFurnitureListSelector } from "../../redux-duck/selectors";
// Components
import { MainLoader } from "../../../../all-components";
import FurnitureList from "./furniture-list.component";
// TS types
import { FilterFurniture } from "../../types";
import { ReduxState } from "../../../../../redux/root-reducer";

type OwnProps = { children?: never };
type ReduxStateToProps = {
    isLoading: boolean,
    furnitureList: FilterFurniture[];
};
type Props = OwnProps & InjectedFormProps<{}, OwnProps> & ReduxStateToProps;

const FormComponent = (props: Props): ReactElement<Props> => {
    const [isOpen, setIsOpen] = useState<{ [x: string]: boolean }>(get(CustomPackage.CustomPackageStep2OpenOther) || {});

    const { handleSubmit, isLoading, furnitureList } = props;

    const onButtonSubtitleClick: ReactEventHandler<HTMLButtonElement> = (event) => {
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
            <h2 className={styles.title}>
                {furniture.label}
            </h2>
            <p className={styles.subtitle}>Essentials</p>
            <FurnitureList
                furniture={furniture.essentials}
                furnitureName={furniture.label}
                checked={true}
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
                    furnitureName={furniture.label}
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
    const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => {
        const getFurnitureListSelector = makeGetFurnitureListSelector();

        return {
            isLoading: getLoadingSelector(state),
            furnitureList: getFurnitureListSelector(state)
        };
    };

    return mapStateToProps;
};

export default compose<ComponentType<OwnProps>>(
    reduxForm<{}, OwnProps>({
        form: FormName.CustomPackageStep2,
        onSubmit: onFormSubmitStep2
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(makeMapStateToProps)
)(FormComponent);
