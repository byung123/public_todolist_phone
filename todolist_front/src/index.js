import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
// App 만 감싸져 있으면 BrowserRouter와 RecoilRoot 순서는 상관없다(워가 바깥에 있는지 상관x)
root.render(
    <RecoilRoot> 
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
