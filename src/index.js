import React from 'react';
import {render} from 'react-dom';
import {Provider, observer, inject} from 'mobx-react';
import {App} from './app';
import {MyStore} from './store';

const store = new MyStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);
