import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
// Utils
import _get from "lodash/fp/get";
// Redux
import redux, { connect } from "react-redux";
// Components
import { toastr } from "react-redux-toastr";
import DropZone from "./components/drop-zone/drop-zone.component";
// TS types
import form from "redux-form";
import { ReduxState } from "../../../redux/root-reducer";

type OwnProps = {
    children?: never;
    formName: string;
    uploadFunction: (acceptedFiles: File[]) => void;
    preview: any;
    deletePreview: (id: string) => void;
} & form.WrappedFieldProps;
type ReduxStateToProps = { files: File[] };
type Props = OwnProps & form.WrappedFieldProps & ReduxStateToProps;

const FileUploaderComponent = (props: Props): React.ReactElement<Props> => {
    const { uploadFunction } = props;
    const onDrop = useCallback((acceptedFiles) => {
        uploadFunction(acceptedFiles);
        props.input.onChange(props.files);
    }, [props.files, props.input, uploadFunction]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: "image/*, application/pdf"
    });
    const { formName, input, deletePreview, preview } = props;

    if (isDragReject) {
        toastr.error("Accept formats", "You can upload pdf files and all image file formats");
    }

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <DropZone
                isDragReject={isDragReject}
                isDragActive={isDragActive}
                formName={formName}
                name={input.name}
                preview={preview}
                deletePreview={deletePreview}
            />
        </div>
    );
};

// Enhancer
const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state, ownProps) => ({
    files: _get(`form[${ownProps.formName}]values[${ownProps.input.name}]`, state)
});

export default connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)(FileUploaderComponent);
