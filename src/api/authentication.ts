import { http } from "./config";
// TS types
import { UserRegistration } from "../components/steps/custom-package/types";


export default {
    registerUser: (user: UserRegistration) => http("POST", "consumer_facing/register", user)
};
