import React, { useState } from "react";
// Styles
import styles from "./form.module.css";
// Utils
import http from "../../../../../../api/custom-package";
import convertToFormData from "object-to-formdata";
import { set, get } from "local-storage";
import { FormName } from "../../../../../../app-constants";
import { onFormSubmitStep4 } from "../../../utils/submitting";
import { syncValidate } from "../../../../../form-fields/utils/sync-validate";
import { CustomPackage } from "../../../utils/submitting";
import { toastr } from "react-redux-toastr";
import { getAxiosError } from "../../../../../../utils/helpers";
// Redux
import form, { reduxForm } from "redux-form";
import redux, { connect } from "react-redux";
import { compose } from "redux";
import { getLoadingSelector } from "../../../redux-duck/selectors";
// Components
import { MainLoader, Input, Select, FileUploader } from "../../../../../all-components";
// TS types
import { ReduxState } from "../../../../../../redux/root-reducer";
import { CustomPackageStep4File, PostFiles } from "../../../../../../types/custom-package";
import { Error } from "../../../../../../types/axios";

type OwnProps = { children?: never; };
type ReduxStateToProps = {
    isLoading: boolean;
};
export type FormData = {
    deliver_city: string;
    styles: any;
    people_counter: number | string;
    reason_id: string;
    preferred_delivery_date: string;
};
type Props = OwnProps & ReduxStateToProps & form.InjectedFormProps<FormData, OwnProps>;

const reasonOptions = [
    { value: "1", label: "1. investment property" },
    { value: "2", label: "2. moving for work" },
    { value: "3", label: "3. first home" },
    { value: "4", label: "4. redecorating" }
];

const deliveryOptions = [
    { value: "1", label: "1. within 1 month" },
    { value: "2", label: "2. in 2-3 months" },
    { value: "3", label: "3. 3 months later" },
    { value: "4", label: "4. no plan to move" }
];

const FormComponent = (props: Props): React.ReactElement<Props> => {
        const [preview, setPreview] = useState<CustomPackageStep4File[] | []>(get(CustomPackage.CustomPackageStep4Styles) || []);
        const { handleSubmit, isLoading } = props;

        const deleteFile = (id: string): void => {
            const newPreviews = preview.filter((item) => item.id !== parseInt(id, 10));
            set(CustomPackage.CustomPackageStep4Styles, newPreviews);
            setPreview(newPreviews);
        };

        const deletePreview = (id: string): void => {
            const toastrConfirmOptions = {
                onOk: () => deleteFile(id),
                onCancel: () => undefined
            };
            toastr.confirm("Are you sure about that!", toastrConfirmOptions);

            http.deleteFile(id)
                .catch((error: Error) => {
                    const err = getAxiosError(error);
                    toastr.error("Delete file error", err);
                });

        };

        const uploadFiles = (files: File[]) => {
            const images = files.map((file: File) => ({
                aws_path: file,
                name: file.name
            }));

            const data = { survey: { images } };
            http.postFiles(convertToFormData(data))
                .then((response: PostFiles) => {
                    const alreadySelect: CustomPackageStep4File[] = get(CustomPackage.CustomPackageStep4Styles);

                    if (alreadySelect && alreadySelect.length) {
                        set(CustomPackage.CustomPackageStep4Styles, alreadySelect.concat(response.data));
                        setPreview(alreadySelect.concat(response.data));
                    } else {
                        set(CustomPackage.CustomPackageStep4Styles, response.data);
                        setPreview(response.data);
                    }

                })
                .catch((error: Error) => {
                    const err = getAxiosError(error);
                    toastr.error("Save files error", err);
                });
        };

        return (
            <form noValidate onSubmit={handleSubmit}>
                {
                    isLoading ? (
                        <div className={styles.loader}>
                            <MainLoader />
                        </div>
                    ) : (
                        <>
                            <div className={styles.fieldset}>
                                <div className={styles["field-wrapper"]}>
                                    <Select
                                        className={styles.select}
                                        name="reason_id"
                                        label="Reason for this project"
                                        placeholder="Select"
                                        options={reasonOptions}
                                        validate={[syncValidate.required]}
                                    />
                                </div>
                                <div className={styles["field-wrapper"]}>
                                    <Input
                                        name="deliver_city"
                                        label="Which city will this property be in?"
                                        validate={[syncValidate.required]}
                                    />
                                </div>
                            </div>
                            <div className={styles.fieldset}>
                                <div className={styles["field-wrapper"]}>
                                    <Select
                                        className={styles.select}
                                        name="preferred_delivery_date"
                                        label="When do you need this property furnished?"
                                        placeholder="Select"
                                        options={deliveryOptions}
                                        validate={[syncValidate.required]}
                                    />
                                </div>
                                <div className={styles["field-wrapper"]}>
                                    <Input
                                        name="people_counter"
                                        label="how many people (max) will live in the property?"
                                        type="number"
                                        validate={[syncValidate.required]}
                                    />
                                </div>
                            </div>
                            <FileUploader
                                name="styles"
                                uploadFunction={uploadFiles}
                                preview={preview}
                                deletePreview={deletePreview}
                                formName={FormName.CustomPackageStep4}
                                label="Allow user to upload files in image formats and pdf"
                            />
                        </>
                    )
                }
            </form>
        );
    }
;

const mapStateToProps: redux.MapStateToProps<ReduxStateToProps, OwnProps, ReduxState> = (state) => ({
    isLoading: getLoadingSelector(state)
});

export default compose<React.ComponentType<OwnProps>>(
    reduxForm<FormData, OwnProps>({
        form: FormName.CustomPackageStep4,
        onSubmit: onFormSubmitStep4
    }),
    connect<ReduxStateToProps, {}, OwnProps, ReduxState>(mapStateToProps)
)(FormComponent);
