import React, { ReactElement } from "react";
// Components
import { Field } from "redux-form";
import FileUploaderComponent from "./file-uploader.component";
// TS types
import { InputProps } from "../common/field.component";

type Props = InputProps

const FileUploaderFieldComponent = (props: Props): ReactElement<Props> => {
    const { name } = props;

    return (
        <Field name={name} component={FileUploaderComponent} />
    );
};

export default FileUploaderFieldComponent;
