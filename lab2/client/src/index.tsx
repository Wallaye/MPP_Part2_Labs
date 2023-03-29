import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ActivitiesStore from "./store/ActivitiesStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const userStore = new UserStore();
const actStore = new ActivitiesStore();
export const Context = createContext({userStore, actStore});

root.render(
    <Context.Provider value={{userStore, actStore}}>
        <App />
    </Context.Provider>
);
