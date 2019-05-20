import React from "react";
import { render } from "react-dom";
// Root component
import AppComponent from "./app/app.component";

const mountApp = document.getElementById("app-root");

render(
    <AppComponent />,
    mountApp
);
