import { http } from "./config";

export default {
    getRoomList: () => http("GET", "consumer_facing/categories")
};
