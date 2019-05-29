import React, { ReactElement } from "react";
import { FormName } from "../../../../../app-constants";
// Styles
import styles from "./form.module.css";
// Components
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import RoomItem from "./item.component";
// TS types
type OwnProps = {
    onSubmit: (values: any) => void;
    children?: never;
}
type Props = OwnProps & InjectedFormProps<{}, OwnProps>

const FormComponent = (props: Props): ReactElement<Props> => {
    const { handleSubmit } = props;

    return (
        <form noValidate onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
                <Field
                    name={`rooms-${1}`}
                    component={RoomItem}
                    roomTitle={"Bedroom"}
                />
            </div>
            <div className={styles.field}>
                <Field
                    name={`rooms-${2}`}
                    component={RoomItem}
                    roomTitle={"Dinning Room"}
                    roomImage={"https://s3.amazonaws.com/gofourwalls/globalimages/icons/rooms/dining-room.png"}
                />
            </div>
            <div className={styles.field}>
                <Field
                    name={`rooms-${3}`}
                    component={RoomItem}
                    roomTitle={"Living Room"}
                    roomImage={"https://s3.amazonaws.com/gofourwalls/globalimages/icons/rooms/living-room.png"}
                />
            </div>

            <div>
                <button>test submit</button>
            </div>
        </form>
    );
};

export default reduxForm<{}, OwnProps>({
    form: FormName.CustomPackageStep1
})(FormComponent);
