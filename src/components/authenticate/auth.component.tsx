import React, { useState } from "react";
// Components
import LoginForm from "./components/login-form.component";
import RegistrationForm from "./components/registration-form.component";
// TS types
type OwnProps = { children?: never; };
type Props = OwnProps;

const AuthComponent = (props: Props): React.ReactElement<Props> => {
    const [isNewUser, setNewUser] = useState<boolean>(true);

    const switchFrom = (): void => setNewUser(!isNewUser);

    return (
        <>
            {isNewUser ? <RegistrationForm switchFrom={switchFrom} /> : <LoginForm switchFrom={switchFrom} />}
        </>
    );
};

export default AuthComponent;
