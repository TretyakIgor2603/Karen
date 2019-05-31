import React, { ReactElement, ComponentType } from "react";
import { FormName } from "../../../../../app-constants";
import { onFormSubmitStep1 } from "../utils";
// Styles
import styles from "./form.module.css";
// Redux
import { connect, MapStateToProps } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector, getRoomListSelector } from "../../redux-duck/selectors";
// Components
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import RoomItem from "./item.component";
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
type Props = OwnProps & InjectedFormProps<{}, OwnProps> & ReduxStateToProps

const FormComponent = (props: Props): ReactElement<Props> => {
    const { handleSubmit, isLoading, rooms } = props;

    const roomsBody = (rooms && rooms.length) ? (
        rooms.map((room) => {
            return (
                <div className={styles.field} key={room.value}>
                    <Field
                        name={`room-${room.label}`}
                        component={RoomItem}
                        roomImage={room.icon_url.url}
                        roomTitle={room.label}
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
    reduxForm<{}, OwnProps>({
        form: FormName.CustomPackageStep1,
        onSubmit: onFormSubmitStep1
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);

