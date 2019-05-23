import React, { ReactElement, SyntheticEvent } from "react";
// Styles
import styles from "./preview.module.css";
import iconPDF from "./images/pdf-format.svg";
// Utils
import _get from "lodash/fp/get";
// Redux
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { change, FormAction } from "redux-form";
import { ReduxState } from "../../../../../redux/root-reducer";
// Components
import { toastr } from "react-redux-toastr";
import DeleteButtonIcon from "./delete-button-icon.component";
// TS types
type ReduxStateToProps = { files?: File[] }

type ReduxDispatchToProps = { changeValue: (form: string, field: string, value: any) => FormAction }

type OwnProps = {
    name: string;
    formName: string;
    children?: never;
}

type Props = OwnProps & ReduxStateToProps & ReduxDispatchToProps

const PreviewComponent = (props: Props): ReactElement<Props> => {
    const { files = [], formName, name, changeValue } = props;

    const calculateBytesToKilobytes = (bytes: number): number => {
        const oneKB = 1000;
        return Math.floor(bytes / oneKB);
    };

    const onItemClick = (event: SyntheticEvent<HTMLLIElement>): void => event && event.stopPropagation && event.stopPropagation();

    const onDeletePreviewButtonClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
        event && event.stopPropagation && event.stopPropagation();
        const newFiles = files.filter((file: File) => file.name !== event.currentTarget.dataset.id);

        const toastrConfirmOptions = {
            onOk: () => changeValue(formName, name, newFiles),
            onCancel: () => undefined
        };
        toastr.confirm("Are you sure about that!", toastrConfirmOptions);
    };

    const filesBody = (files && files.length) ? (
        files.map((file: File) => (
            <li key={file.name} className={styles.item} onClick={onItemClick}>
                <div className={styles.preview}>
                    <img
                        src={(file.type === "application/pdf") ? iconPDF : URL.createObjectURL(file)}
                        alt={file.name}
                        className={styles.image}
                    />
                </div>
                <div className={styles["item-hover"]}>
                    <button
                        type="button"
                        data-id={file.name}
                        className={styles["remove-button"]}
                        onClick={onDeletePreviewButtonClick}
                    >
                        <DeleteButtonIcon />
                        <span className="visually-hidden">Delete preview</span>
                    </button>
                    <p className={`text-ellipsis ${styles.subtitle}`}>
                        <strong>{calculateBytesToKilobytes(file.size)}</strong> KB
                    </p>
                    <p className={`text-ellipsis ${styles.subtitle}`}>{file.name}</p>
                </div>
            </li>
        ))

    ) : null;

    return (
        <ul className={styles.list}>
            {filesBody}
        </ul>
    );
};

// Enhancer
const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state, ownProps) => ({
    files: _get(`form[${ownProps.formName}]values[${ownProps.name}]`, state)
});

const mapDispatchToProps: MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    changeValue: (form, field, value) => dispatch(change(form, field, value))
});

export default connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)(PreviewComponent);
