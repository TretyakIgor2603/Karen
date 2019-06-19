import React from "react";
// Components
import { Field } from "redux-form";
import FileUploaderComponent from "./file-uploader.component";
// TS types
import { InputProps } from "../common/field.component";

type Props = {
    formName: string;
    uploadFunction: (acceptedFiles: File[]) => void;
    preview: any;
    deletePreview: (id: string) => void;
} & InputProps

const FileUploaderFieldComponent = (props: Props): React.ReactElement<Props> => {
    const { name, formName, uploadFunction, preview, deletePreview } = props;

    return (
        <Field
            name={name}
            formName={formName}
            uploadFunction={uploadFunction}
            component={FileUploaderComponent}
            preview={preview}
            deletePreview={deletePreview}
        />
    );
};

export default FileUploaderFieldComponent;
