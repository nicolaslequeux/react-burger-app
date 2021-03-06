import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import { watchAuth, watchBurgerBuilder, watchOrder } from "./store/sagas/index";

// const store = createStore(reducer);

// Ajourt de devtools (https://github.com/zalmoxisus/redux-devtools-extension)
// const store = createStore(
//   burgerBuilderReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  );


const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  // I define 3 domains for reducers
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

// Get the store a as global variabel inside browser
//window.store = store;

const app = (
  <React.StrictMode>
    <Provider store={store}>
    {/* <BrowserRouter basename="/my-app"> */}
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// 'app' is an argument of the render function
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

