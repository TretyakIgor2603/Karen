import React, { memo, Suspense, lazy, useState } from "react";
// Styles
import styles from "./preview.module.css";
// Utils
import _get from "lodash/fp/get";
import { get, set } from "local-storage";
import http from "../../../../../api/custom-package";
import { getAxiosError } from "../../../../../utils/helpers";
// Redux
import redux, { connect } from "react-redux";
import { compose } from "redux";
import form, { change } from "redux-form";
import { ReduxState } from "../../../../../redux/root-reducer";
// Components
import { toastr } from "react-redux-toastr";
import PreviewHover from "./preview-hover.component";
import { FileLoader } from "../../../../all-components";
import iconPDF from "./images/pdf-format.svg";
import { CustomPackage } from "../../../../steps/custom-package/utils/submitting";
// TS types
import { CustomPackageStep4File } from "../../../../../types/custom-package";
import { Error } from "../../../../../types/axios";

const LazyImage = lazy(() => import("./preview-image.component"));
// TS types
type ReduxStateToProps = { files?: File[] }

type ReduxDispatchToProps = { changeValue: (form: string, field: string, value: any) => form.FormAction }

type OwnProps = {
    name: string;
    formName: string;
    children?: never;
}

type Props = OwnProps & ReduxStateToProps & ReduxDispatchToProps;

const PreviewComponent = (props: Props): React.ReactElement<Props> => {
    const [previews, setPreviews] = useState<CustomPackageStep4File[] | undefined>(get(CustomPackage.CustomPackageStep4Styles));
    const { files = [], formName, name, changeValue } = props;

    const calculateBytesToKilobytes = (bytes: number): number => {
        const oneKB = 1000;
        return Math.floor(bytes / oneKB);
    };

    const onItemClick = (event: React.SyntheticEvent<HTMLLIElement>): void => event && event.stopPropagation && event.stopPropagation();

    const onDeletePreviewButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event && event.stopPropagation && event.stopPropagation();
        const newFiles = files.filter((file: File) => file.name !== event.currentTarget.dataset.id);

        const toastrConfirmOptions = {
            onOk: () => changeValue(formName, name, newFiles),
            onCancel: () => undefined
        };
        toastr.confirm("Are you sure about that!", toastrConfirmOptions);
    };

    const onDeletePreviewButtonClickHttp = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event && event.stopPropagation && event.stopPropagation();
        const id = event.currentTarget.dataset.id;

        if (id) {
            http.deleteFile(id)
                .then(() => {
                    if (previews) {
                        const newPreviews = previews.filter((item) => item.id !== parseInt(id, 10));
                        set(CustomPackage.CustomPackageStep4Styles, newPreviews);
                        setPreviews(newPreviews);
                    }
                })
                .catch((error: Error) => {
                    const err = getAxiosError(error);
                    toastr.error("Delete file error", err);
                });
        }

        const toastrConfirmOptions = {
            onOk: () => changeValue(formName, name, () => {}),
            onCancel: () => undefined
        };
        toastr.confirm("Are you sure about that!", toastrConfirmOptions);
    };

    const filesBody = (files && files.length) ? (
        files.map((file: File) => (
            <li key={file.name} className={styles.item} onClick={onItemClick}>
                <Suspense fallback={<FileLoader />}>
                    <LazyImage
                        src={(file.type === "application/pdf") ? iconPDF : URL.createObjectURL(file)}
                        alt={file.name}
                    />
                </Suspense>
                <PreviewHover
                    id={file.name}
                    fileName={file.name}
                    fileSize={calculateBytesToKilobytes(file.size)}
                    onDeletePreviewButtonClick={onDeletePreviewButtonClick}
                />
            </li>
        ))

    ) : null;

    const previewBody = (previews && Array.isArray(previews)) ? (
        previews.map((arrayItem) => (
            <li key={arrayItem.id} className={styles.item} onClick={onItemClick}>
                <Suspense fallback={<FileLoader />}>
                    <LazyImage
                        src={(arrayItem.aws_path.url.endsWith(".pdf")) ? iconPDF : arrayItem.aws_path.url}
                        alt={arrayItem.aws_path.url}
                    />
                    <PreviewHover
                        id={arrayItem.id}
                        fileName={arrayItem.aws_path.url}
                        fileSize={calculateBytesToKilobytes(arrayItem.size)}
                        onDeletePreviewButtonClick={onDeletePreviewButtonClickHttp}
                    />
                </Suspense>
            </li>
        ))
    ) : null;

    return (
        <ul className={styles.list}>
            {filesBody}
            {previewBody}
        </ul>
    );
};

// Enhancer
const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state, ownProps) => ({
    files: _get(`form[${ownProps.formName}]values[${ownProps.name}]`, state)
});

const mapDispatchToProps: redux.MapDispatchToProps<ReduxDispatchToProps, OwnProps> = (dispatch) => ({
    changeValue: (form, field, value) => dispatch(change(form, field, value))
});

export default compose<React.ComponentType<OwnProps>>(
    memo,
    connect<ReduxStateToProps, ReduxDispatchToProps, OwnProps, ReduxState>(mapStateToProps, mapDispatchToProps)
)(PreviewComponent);
