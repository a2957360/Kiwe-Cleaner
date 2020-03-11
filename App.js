import React, { Component } from 'react';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './src/reducers/index';

import KiweApp from './src/KiweApp';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

class App extends Component {

    render() {
        console.disableYellowBox = true;

        return (
            <Provider store={store}>
                <KiweApp />
            </Provider>
        );
    }
}

export default App;