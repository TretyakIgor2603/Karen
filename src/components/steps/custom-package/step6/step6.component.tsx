import React, { ReactElement } from "react";
// Components
import Layout from "../../layout/layout.component";
import { Authenticate } from "../../../all-components";

type OwnProps = { children?: never; };
type Props = OwnProps;

const Step6Component = (props: Props): ReactElement<Props> => {
    return (
        <Layout title="Get Your Custom Room">
            <Authenticate />
        </Layout>
    );
};

export default Step6Component;
