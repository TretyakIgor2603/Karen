import React, { memo, Suspense, lazy } from "react";
// Styles
import styles from "./preview.module.css";
// Utils
import _get from "lodash/fp/get";
// Redux
import redux, { connect } from "react-redux";
import { compose } from "redux";
import form, { change } from "redux-form";
import { ReduxState } from "../../../../../redux/root-reducer";
// Components
import PreviewHover from "./preview-hover.component";
import { FileLoader } from "../../../../all-components";
import iconPDF from "./images/pdf-format.svg";

const LazyImage = lazy(() => import("./preview-image.component"));
// TS types
type ReduxStateToProps = { files?: File[] }

type ReduxDispatchToProps = { changeValue: (form: string, field: string, value: any) => form.FormAction }

type OwnProps = {
    name: string;
    formName: string;
    children?: never;
    preview: any;
    deletePreview: (id: string) => void;
}

type Props = OwnProps & ReduxStateToProps & ReduxDispatchToProps;

const PreviewComponent = (props: Props): React.ReactElement<Props> => {
    const { preview, deletePreview } = props;

    const calculateBytesToKilobytes = (bytes: number): number => {
        const oneKB = 1000;
        return Math.floor(bytes / oneKB);
    };

    const onItemClick = (event: React.SyntheticEvent<HTMLLIElement>): void => event && event.stopPropagation && event.stopPropagation();

    const onDeletePreviewButtonClick = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
        event && event.stopPropagation && event.stopPropagation();
        const id = event.currentTarget.dataset.id;
        if (id) {
            deletePreview(id);
        }
    };

    const previewBody = (preview && Array.isArray(preview)) ? (
        preview.map((arrayItem) => (
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
                        onDeletePreviewButtonClick={onDeletePreviewButtonClick}
                    />
                </Suspense>
            </li>
        ))
    ) : null;

    return (
        <ul className={styles.list}>
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
