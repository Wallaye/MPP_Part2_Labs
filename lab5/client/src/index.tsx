import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {userClient} from "./graphql";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const userStore = new UserStore();
export const Context = createContext({userStore});

root.render(
    <ApolloProvider client={userClient}>
        <Context.Provider value={{userStore}}>
            <App/>
        </Context.Provider>
    </ApolloProvider>
);
