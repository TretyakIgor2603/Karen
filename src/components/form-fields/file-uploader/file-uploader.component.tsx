import React, { useCallback, ReactElement } from "react";
import { useDropzone } from "react-dropzone";
// Utils
import _get from "lodash/fp/get";
import _find from "lodash/fp/find";
// Redux
import { connect, MapStateToProps } from "react-redux";
// Components
import { toastr } from "react-redux-toastr";
import DropZone from "./components/drop-zone/drop-zone.component";
// TS types
import { WrappedFieldProps } from "redux-form";
import { ReduxState } from "../../../redux/root-reducer";

type OwnProps = { children?: never; formName: string } & WrappedFieldProps;
type ReduxStateToProps = { files: File[] };
type Props = OwnProps & WrappedFieldProps & ReduxStateToProps;

const getUploadFiles = (acceptedFiles: File[], files: File[]): File[] => {
    return acceptedFiles.reduce((acc: File[], file: File) => {
        const found = _find(file, files);

        if (found) {
            toastr.info("File already added", `You cannot add a ${found.name} file a second time`);
        } else {
            acc.push(file);
        }

        return acc;
    }, []);
};

const FileUploaderComponent = (props: Props): ReactElement<Props> => {
    const onDrop = useCallback((acceptedFiles) => {
        const uploadFiles = getUploadFiles(acceptedFiles, props.files);
        const newFiles = [...(props.files ? props.files : []), ...uploadFiles];

        props.input.onChange(newFiles);
    }, [props.input, props.files]);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: "image/*, application/pdf"
    });
    const { formName, input } = props;

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
            />
        </div>
    );
};

// Enhancer
const mapStateToProps: MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state, ownProps) => ({
    files: _get(`form[${ownProps.formName}]values[${ownProps.input.name}]`, state)
});

export default connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)(FileUploaderComponent);
