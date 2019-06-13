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

export const getSelectedFurniture = (values: { [key: string]: string }) => {
    const selectedFurniture = [];

    let categoryName = "",
        categoryId = "",
        furnitureId = "",
        countFurniture = "";

    // {
    //     category_name: 'Living_Room 1',
    //     category_room_id: 12 ,
    //     furniture: [
    //         {product_category_id: 12, count: 4},
    //         {product_category_id: 11, count: 2}
    //     ]
    // },

    for (const [key, value] of Object.entries(values)) {

        if (value && !key.includes("count")) {
            const temp = key.split("_");

            categoryId = temp[temp.length - 2];
            furnitureId = temp[temp.length - 1];
            categoryName = key.substring(0, (key.length - (categoryId.length + furnitureId.length + 2)));

            selectedFurniture.push({
                category_name: categoryName,
                category_room_id: categoryId,
                furniture: [
                    {
                        product_category_id: furnitureId,
                        count: values[`${key}-count`]
                    }
                ]
            });

        }
    }

    return selectedFurniture;
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
