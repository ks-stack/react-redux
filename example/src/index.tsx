import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, context } from './utils/redux';
import store from './models';
import ClassComponent from './modules/ClassComponent';
// import HooksComponents from './modules/HooksComponents';

ReactDOM.render(
    <React.StrictMode>
        <Provider context={context} store={store}>
            <ClassComponent id={8} />
            {/* <HooksComponents /> */}
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
