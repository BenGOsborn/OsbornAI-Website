import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Routes from './routes';

const App = () => {
    const history = createMemoryHistory();

    return (
        <BrowserRouter history={history}>
            <Routes />
        </BrowserRouter>
    );
};

export default App;