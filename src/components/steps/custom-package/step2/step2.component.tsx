import React, { useEffect, useState } from "react";
// Utils
import { get } from "local-storage";
import { initialize } from "redux-form";
import { FormName } from "../../../../app-constants";
import { CustomPackage } from "../utils/submitting";
import _kebabCase from "lodash/fp/kebabCase";
import _lowerCase from "lodash/fp/lowerCase";
// Redux
import redux, { connect } from "react-redux";
import { getPopupStatus } from "../../../modal/redux-duck/selectors";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
import { Modal } from "../../../all-components";
// TS types
import { ReduxState } from "../../../../redux/root-reducer";
import { SelectedRoom, SelectedRoomFurniture } from "../../../../types/custom-package";

type OwnProps = { children?: never };
type ReduxStateToProps = {
    isPopupOpen: boolean;
};
type ReduxDispatchToProps = { initializeForm: typeof initialize };
type Props = OwnProps & ReduxStateToProps & ReduxDispatchToProps;

const getPreviousFurnitureList = (): any => {
    const categoriesIds: number[] = get(CustomPackage.CustomPackageStep1Ids);
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
    const [furnitureList, setFurnitureList] = useState<any>([]);
    useEffect(() => {
        props.initializeForm(FormName.CustomPackageStep2, get(CustomPackage.CustomPackageStep2));
        setFurnitureList(getChangedFurnitureList());
        // eslint-disable-next-line
    }, []);

    const { isPopupOpen } = props;

    const getChangedFurnitureList = () => {
        const categoriesIds: number[] = get(CustomPackage.CustomPackageStep1Ids);
        const previousFurnitureList: SelectedRoom[] = getPreviousFurnitureList() || [];

        return previousFurnitureList.filter((furniture: SelectedRoom) => categoriesIds && categoriesIds.indexOf(furniture.id) !== -1);
    };

    const furnitureListBody = (furnitureList && furnitureList.length) ? (
        furnitureList.map((furniture: SelectedRoomFurniture) => <li key={furniture.label}>{furniture.label}</li>)
    ) : null;

    return (
        <Layout title="Select furniture for each room">
            <Form />
            {isPopupOpen && (
                <Modal title="What rooms do you want to remove?" onClick={() => console.log("button close click")}>
                    {furnitureListBody}
                </Modal>
            )}
        </Layout>
    );
};

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isPopupOpen: getPopupStatus(state)
});

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    initializeForm: (formName: string, initialValues: any) => dispatch(initialize(formName, initialValues))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(Step2Component);
