import React from "react";
// Components
import { Field } from "redux-form";
import FileUploaderComponent from "./file-uploader.component";
// TS types
import { InputProps } from "../common/field.component";

type Props = { formName: string } & InputProps

const FileUploaderFieldComponent = (props: Props): React.ReactElement<Props> => {
    const { name, formName } = props;

    return (
        <Field name={name} formName={formName} component={FileUploaderComponent} />
    );
};

export default FileUploaderFieldComponent;
