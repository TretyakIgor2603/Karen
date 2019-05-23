import React, { useCallback, ReactElement } from "react";
import { useDropzone } from "react-dropzone";
// Components
import DropZone from "./components/drop-zone/drop-zone.component";
// TS types
type Props = { children?: never }

const FileUploaderComponent = (props: Props): ReactElement<Props> => {
    const onDrop = useCallback((files) => {
        console.log("--files", files);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <DropZone isDragActive={isDragActive} />
        </div>
    );
};

export default FileUploaderComponent;
