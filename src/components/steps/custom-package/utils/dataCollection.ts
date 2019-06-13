import { toastr } from "react-redux-toastr";
import { getAxiosError } from "../../../../utils/helpers";

export const getCategories = (values: { [key: string]: string }) => {
    const categories = [];

    for (const [key, value] of Object.entries(values)) {
        if (value && !key.includes("count")) {
            categories.push({
                id: key.substring(2),
                count: Number(values[`${key}-count`])
            });
        }
    }

    return categories;
};

export const getSelectedFurniture = (values: { [key: string]: any }) => {
    const selected_furniture: any = {};

    try {
        for (const [key, value] of Object.entries(values)) {

            selected_furniture[key] = {
                category_name: key,
                category_room_id: value.category_room_id,
                furniture: []
            };

            for (const [k, v] of Object.entries(value)) {
                if (v && !k.endsWith("-id") && k !== "category_room_id") {
                    if (values[key][`${k}-id`] && values[key][key][`${k}-count`]) {
                        selected_furniture[key].furniture.push({
                            product_category_id: values[key][`${k}-id`],
                            count: parseInt(values[key][key][`${k}-count`], 10)
                        });
                    }
                }
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
    const answers: { [key: string]: string | File[] | undefined } = {};

    for (const [key, value] of Object.entries(values)) {
        if (key === "preferred_delivery_date" || key === "reason_id") {
            answers[key] = value.substring(0, 1);
        } else {
            answers[key] = value;
        }
    }

    return answers;
};
