import React, { ReactElement } from "react";
// Components
import Layout from "../../layout/layout.component";
import Form from "./components/form.component";
// TS types
type OwnProps = { children?: never }
type Props = OwnProps

const Step1Component = (props: Props): ReactElement<Props> => {
    const onFormSubmit = (values: any): void => {
        console.log("🍆 custom package step1", values);
    };

    return (
        <Layout title="How many rooms do you need to furnish?">
            <Form onSubmit={onFormSubmit} />
        </Layout>
    );
};

export default Step1Component;
