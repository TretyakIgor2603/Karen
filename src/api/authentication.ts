import { http } from "./config";
// TS types
import { UserRegistration, UserLogin } from "../components/steps/custom-package/types";

export default {
    registerUser: (user: UserRegistration) => http("POST", "consumer_facing/register", user),

    loginUser: (user: UserLogin) => http("POST", "consumer_facing/login", user)
};
