import React, { useEffect, useState } from "react";
// Styles
import styles from "./step2.module.css";
// Utils
import cn from "classnames";
import { get } from "local-storage";
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
import _kebabCase from "lodash/fp/kebabCase";
import _lowerCase from "lodash/fp/lowerCase";
import _differenceBy from "lodash/fp/differenceBy";
// Redux
import redux, { connect } from "react-redux";
import { getFurnitureListDoneAction } from "../redux-duck/actions";
import { getPopupStatus } from "../../../modal/redux-duck/selectors";
import { getOriginFurnitureList } from "../redux-duck/selectors";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
import { Modal, MainButton } from "../../../all-components";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { Furniture, SelectedRoom, SelectedRoomFurniture } from "../../../../types/custom-package";

type OwnProps = { children?: never };
type ReduxStateToProps = {
    isPopupOpen: boolean;
    furniture: Furniture[]
};
type ReduxDispatchToProps = {
    initializeForm: typeof initialize;
    getFurnitureListDone: typeof getFurnitureListDoneAction;
};
type Props = OwnProps & ReduxStateToProps & ReduxDispatchToProps;

const getPreviousFurnitureList = (): SelectedRoom[] | void => {
    const categoriesIds: number[] = get(CustomPackage.CustomPackageStep1Ids) || [];
    const furnitureList: { [key: string]: any } = get(CustomPackage.CustomPackageStep2);
    const rooms: any = {};

    if (!categoriesIds.length) return;

    for (const [key, value] of Object.entries(furnitureList)) {
        const isCategory: boolean = /(?=.*[A-Z])/.test(key);
        const name = _kebabCase(key);

        if (isCategory) {
            rooms[name] = {
                id: value,
                label: key,
                furniture: []
            };
        } else {
            if (key.endsWith("-id") || key.endsWith("-count") || !value) continue;
            const splitKey = key.split("---");
            const categoryName = splitKey[0];
            const furnitureName = _lowerCase(splitKey[1]);

            rooms[categoryName].furniture.push({
                label: furnitureName,
                count: furnitureList[`${key}-count`]
            });

        }
    }

    return Object.values(rooms);
};

const Step2Component = (props: Props): React.ReactElement<Props> => {
    const [furnitureList, setFurnitureList] = useState<{ [key: string]: any }>([]);
    const [selectedRooms, setSelectedRooms] = useState<any>([]);
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep2, get(CustomPackage.CustomPackageStep2));
        setFurnitureList(getChangedFurnitureList());
        // eslint-disable-next-line
    }, []);

    const { isPopupOpen } = props;

    const getChangedFurnitureList = () => {
        const categoriesIds: number[] = get(CustomPackage.CustomPackageStep1Ids);
        const previousFurnitureList: SelectedRoom[] | [] = getPreviousFurnitureList() || [];

        return previousFurnitureList.filter((furniture: SelectedRoom) => categoriesIds && categoriesIds.indexOf(furniture.id) !== -1);
    };

    const selectRoom: React.MouseEventHandler<HTMLLIElement> = (event) => {
        const { currentTarget } = event;
        let newSelectedRooms: any = [];

        if (selectedRooms.indexOf(currentTarget.dataset.label) === -1) {
            newSelectedRooms = [...selectedRooms, currentTarget.dataset.label];
        } else {
            newSelectedRooms = selectedRooms.filter((item: string) => item !== currentTarget.dataset.label);
        }

        setSelectedRooms(newSelectedRooms);
    };

    const furnitureListBody = (furnitureList && furnitureList.length) ? (
        furnitureList.map((furniture: SelectedRoom) => {
            const listItemStyle = cn(styles["list-item"], {
                [styles.selected]: selectedRooms.includes(furniture.label)
            });

            return (
                <li
                    key={furniture.label}
                    className={listItemStyle}
                    data-label={furniture.label}
                    onClick={selectRoom}
                >
                    <h3 className={styles.title}>{furniture.label}</h3>
                    <ul className={styles["description-list"]}>
                        {
                            furniture.furniture.map((item: SelectedRoomFurniture) => (
                                <li key={item.label} className={styles["description-item"]}>
                                    {item.label} : {item.count}
                                </li>
                            ))
                        }
                    </ul>
                </li>
            );
        })
    ) : null;

    const onButtonSaveChangesClick = () => {
        const { furniture, getFurnitureListDone } = props;

        const selectedRoomsObj = selectedRooms.map((item: string) => ({ label: item }));
        const diff = _differenceBy("label", furniture, selectedRoomsObj);
        diff.length && getFurnitureListDone(diff);
    };

    return (
        <Layout title="Select furniture for each room">
            <Form />
            {isPopupOpen && (
                <Modal title="What rooms do you want to remove?" onClick={() => console.log("button close click")}>
                    <div className={styles.content}>
                        <ul className={styles.list}>
                            {furnitureListBody}
                        </ul>
                        <div className={styles["button-wrapper"]}>
                            <MainButton className={styles.button} onClick={onButtonSaveChangesClick}>
                                Save changes
                            </MainButton>
                        </div>
                    </div>
                </Modal>
            )}
        </Layout>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isPopupOpen: getPopupStatus(state),
    furniture: getOriginFurnitureList(state)
});

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues)),
    getFurnitureListDone: (furniture: Furniture[]) => dispatch(getFurnitureListDoneAction(furniture))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(Step2Component);
