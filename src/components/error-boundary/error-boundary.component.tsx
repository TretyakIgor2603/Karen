import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
// Components
import ErrorPage from "./components/error.component";
// TS types
type OwnProps = { children: React.ReactElement }
type Props = OwnProps
type State = {
    hasError: boolean;
    error?: Error;
    eventId?: string;
}

const initialState: State = Object.freeze({
    hasError: false,
    error: undefined,
    eventId: undefined
});

class ErrorBoundaryComponent extends Component<Props, State> {
    state = initialState;

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState({ error });

        Sentry.withScope((scope) => {
            scope.setExtras(errorInfo);
            const eventId = Sentry.captureException(error);
            this.setState({ eventId });
        });
    }

    showReportDialog = () => {
        const { eventId } = this.state;
        Sentry.showReportDialog({ eventId });
    };

    render(): React.ReactElement {
        const { hasError, eventId, error } = this.state;

        if (hasError) {
            return <ErrorPage reportError={this.showReportDialog} error={error} eventId={eventId} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundaryComponent;

