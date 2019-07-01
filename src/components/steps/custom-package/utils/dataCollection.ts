import { toastr } from "react-redux-toastr";
import { getAxiosError } from "../../../../utils/helpers";
import { get } from "local-storage";
import _kebabCase from "lodash/fp/kebabCase";
// TS types
import { PersonalQuestions, CustomPackageStep4File } from "../../../../types/custom-package";
import { CustomPackage } from "./submitting";

type Furniture = {
    product_category_id: string;
    count: number;
};

type SelectedFurniture = {
    [key: string]: {
        category_name: string;
        category_room_id: string;
        furniture: Furniture[];
    }
}

export const getCategories = (values: { [key: string]: string }) => {
    const tempArray = [];

    for (const [key, value] of Object.entries(values)) {
        if (typeof value === "boolean" && value && values[`${key}-count`]) {
            tempArray.push({
                id: key.substring(2),
                count: Number(values[`${key}-count`])
            });
        }
    }

    return tempArray;
};

export const getSelectedFurniture = (values: { [key: string]: any }) => {
    const selected_furniture: SelectedFurniture = {};

    try {
        for (const [key, value] of Object.entries(values)) {
            const isCategory: boolean = /(?=.*[A-Z])/.test(key);

            if (isCategory) {
                selected_furniture[key] = {
                    category_name: key,
                    category_room_id: value,
                    furniture: []
                };

                Object.entries(values).forEach((item: any) => {
                    const category = item[0];

                    if (category.startsWith(_kebabCase(key)) && typeof values[category] === "boolean" && values[category]) {
                        selected_furniture[key].furniture.push({
                            product_category_id: values[`${category}-id`],
                            count: values[`${category}-count`]
                        });
                    }
                });

            }
        }
    } catch (error) {
        const err = getAxiosError(error);
        toastr.error("Step 2 error", err);
    }

    return selected_furniture;
};

export const getStyles = (values: { [key: string]: string }) => {
    const stylesIds: number[] = [];

    for (const [key, value] of Object.entries(values)) {
        if (value) {
            stylesIds.push(parseInt(key.substring(2), 10));
        }
    }

    return stylesIds;
};

export const getPersonalQuestions = (values: { [key: string]: string }) => {
    const answers: PersonalQuestions = {};

    for (const [key, value] of Object.entries(values)) {
        if (key === "preferred_delivery_date" || key === "reason_id") {
            // @ts-ignore
            answers[key] = value.substring(0, 1);
        } else {
            answers[key] = value;
        }
    }

    return answers;
};

export const getPersonalQuestionsStyles = (values: CustomPackageStep4File[]) => {
    return values.map((file) => file.aws_path.url);
};

export const getBudgetString = (): any => {
    const range: number[] = get(CustomPackage.CustomPackageStep5);

    if (range && range.length) {
        return `$${range[0]} to $${range[1]}`;
    }
};
