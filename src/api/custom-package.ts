import { http } from "./config";
// TS types
import { StyleReportData } from "../types/custom-package";

export default {
    getRoomList: () => http("GET", "consumer_facing/categories"),

    getFurnitureList: (categoriesIds: number[]) => http("POST", "consumer_facing/categories/select_furniture", categoriesIds),

    getDesignStylesList: () => http("GET", "consumer_facing/design_styles"),

    createStyleReport: (styleReportData: StyleReportData) => http("POST", "consumer_facing/surveys", styleReportData)
};
