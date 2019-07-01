import { http } from "./config";
// TS types
import { StyleReportData, MiddlePriceData } from "../types/custom-package";

export default {
    getRoomList: () => http("GET", "consumer_facing/categories"),

    getFurnitureList: (categoriesIds: number[]) => http("POST", "consumer_facing/categories/select_furniture", categoriesIds),

    getDesignStylesList: () => http("GET", "consumer_facing/design_styles"),

    createStyleReport: (styleReportData: StyleReportData) => http("POST", "consumer_facing/surveys", styleReportData),

    postFiles: (files: File[]) => http("POST", "consumer_facing/surveys/upload_survey_image", files),

    deleteFile: (id: string) => http("DELETE", `consumer_facing/surveys/${id}/destroy_survey_image`),

    calculateMiddlePrice: (data: MiddlePriceData) => http("POST", "consumer_facing/surveys/budget", data)
};
