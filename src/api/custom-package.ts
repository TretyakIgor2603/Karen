import { http } from "./config";

export default {
    getRoomList: () => http("GET", "consumer_facing/categories"),

    getFurnitureList: (categoriesIds: number[]) => http("POST", "consumer_facing/categories/select_furniture", categoriesIds),

    getDesignStylesList: () => http("GET", "consumer_facing/design_styles"),

    createStyleReport: (styleReportData: any) => http("POST", "consumer_facing/surveys", styleReportData)
};
