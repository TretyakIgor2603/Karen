import React, { memo, ReactElement } from "react";
// TS types
type OwnProps = { children?: never }
type Props = OwnProps

const DeleteButtonIconComponent = (props: Props): ReactElement<Props> => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357">
            <path
                d="M357 35.7L321.3 0 178.5 142.8 35.7 0 0 35.7l142.8 142.8L0 321.3 35.7 357l142.8-142.8L321.3 357l35.7-35.7-142.8-142.8z"
            />
        </svg>
    );
};

export default memo(DeleteButtonIconComponent);
