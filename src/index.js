import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import './index.css';
import Home from './component';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Home/>,
);


