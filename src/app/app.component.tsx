import React, { ReactElement } from "react";
// Style
import "./app.style.css";
// Toastr
import Toastr from "react-redux-toastr";
// Helmet
import { Helmet, HelmetProvider } from "react-helmet-async";
import { APP_TITLE } from "../app-constants";
// Redux
import { Provider } from "react-redux";
import store from "../redux/store";
// Components
import {
    Stepper,
    ErrorBoundary,
    Step,
    CustomPackageStep1,
    CustomPackageStep2,
    CustomPackageStep3
} from "../components/all-components";
// TS types
type Props = { children?: never }

const AppComponent = (props: Props): ReactElement<Props> => {
    return (
        <Provider store={store}>
            <HelmetProvider>
                <Helmet>
                    <title>{APP_TITLE}</title>
                </Helmet>
                <ErrorBoundary>
                    <Stepper defaultStepIndex={0}>
                        <Step title="Rooms to furnish">
                            <CustomPackageStep1 />
                        </Step>
                        <Step title="Select furniture">
                            <CustomPackageStep2 />
                        </Step>
                        <Step title="Design styles">
                            <CustomPackageStep3 />
                        </Step>
                        <Step title="Personal questions">Content 4</Step>
                        <Step title="Budget">Content 5</Step>
                        <Step title="Authenticate">Content 6</Step>
                    </Stepper>
                </ErrorBoundary>
                <Toastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar={false}
                    closeOnToastrClick
                />
            </HelmetProvider>
        </Provider>
    );
};

export default AppComponent;
