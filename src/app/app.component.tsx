import React, { ReactElement } from "react";
// Style
import "./app.style.css";
// Helmet
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_TITLE } from "../app-constants";
// Redux
import { Provider } from "react-redux";
import store from "../redux/store";
// Components
import { Counter } from "../components/all-components";
// TS types
type Props = { children?: never }

const AppComponent = (props: Props): ReactElement<Props> => {
    return (
        <Provider store={store}>
            <HelmetProvider>
                <Helmet>
                    <title>{APP_TITLE}</title>
                </Helmet>
                <Counter />
            </HelmetProvider>
        </Provider>
    );
};

export default AppComponent;
