import React from "react";
import { render } from "react-dom";
// Error boundaries
import * as Sentry from "@sentry/browser";
// Root component
import AppComponent from "./app/app.component";

Sentry.init({ dsn: "https://ed65f5d5819b4502ae09b017eae65a1a@sentry.io/1469465" });

const mountApp = document.getElementById("app-root");

render(
    <AppComponent />,
    mountApp
);
