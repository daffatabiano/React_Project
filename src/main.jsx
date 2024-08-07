import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import BaseLayout from './components/Layout/Headers/BaseLayout.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <BaseLayout>
                    <App />
                </BaseLayout>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
