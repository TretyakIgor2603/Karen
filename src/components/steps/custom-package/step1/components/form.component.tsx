import React, { ReactElement, ComponentType } from "react";
// Utils
import { FormName } from "../../../../../app-constants";
import { onFormSubmitStep1 } from "../../utils";
import _get from "lodash/fp/get";
// Styles
import styles from "./form.module.css";
// Redux
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector, getRoomListSelector } from "../../redux-duck/selectors";
// Components
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import RoomItem from "../../item/item.component";
import { MainLoader } from "../../../../all-components";
// TS types
import { Room } from "../../types";
import { ReduxState } from "../../../../../redux/root-reducer";

type ReduxStateToProps = {
    isLoading: boolean;
    rooms: Room[];
}

type OwnProps = {
    children?: never;
}
type FormData = {
    [key: string]: boolean
}
type Props = OwnProps & InjectedFormProps<FormData, OwnProps> & ReduxStateToProps;

const FormComponent = (props: Props): ReactElement<Props> => {
    const { handleSubmit, isLoading, rooms } = props;

    const roomsBody = (rooms && rooms.length) ? (
        rooms.map((room) => {
            const imageUrl = _get("icon_url.url", room);

            return (
                <div className={styles.field} key={room.value}>
                    <Field
                        name={room.custom_label}
                        component={RoomItem}
                        image={imageUrl}
                        title={room.label}
                        initialValue={1}
                    />
                </div>
            );
        })
    ) : null;

    return (
        <form noValidate onSubmit={handleSubmit} className={styles.form}>
            {isLoading ? <MainLoader /> : roomsBody}
        </form>
    );
};

const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state),
    rooms: getRoomListSelector(state)
});

export default compose<ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep1,
        onSubmit: onFormSubmitStep1
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);

