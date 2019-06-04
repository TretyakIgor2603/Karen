import { set } from "local-storage";

export enum CustomPackage {
    CustomPackageStep1 = "CUSTOM-PACKAGE/STEP1",
    CustomPackageStep2 = "CUSTOM-PACKAGE/STEP2"
}

export const onFormSubmitStep1 = (values: any): void => {
    set(CustomPackage.CustomPackageStep1, values);
    console.log("🍆 custom package step1", values);
};

export const onFormSubmitStep2 = (values: any): void => {
    set(CustomPackage.CustomPackageStep2, values);
    console.log("🍆 custom package step2", values);
};
