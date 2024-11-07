import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import store from './store/store.js';
import App from './App/App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
