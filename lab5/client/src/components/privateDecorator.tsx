import React from 'react';
import {ApolloProvider} from "@apollo/client";
import {privateClient} from "../graphql";
import {Outlet} from "react-router-dom";

function PrivateContextLayout(props: any) {
    return (
        <ApolloProvider client={privateClient(props.loginFail)}>
            <Outlet/>
        </ApolloProvider>
    );
}

export default PrivateContextLayout;