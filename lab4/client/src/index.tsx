import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const userStore = new UserStore();
export const Context = createContext({userStore});

root.render(
    <Context.Provider value={{userStore}}>
        <App />
    </Context.Provider>
);
