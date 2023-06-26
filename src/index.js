import axios from "axios";
import React from "react";

import {createRoot} from "react-dom/client";

import {App} from "./App";


window.sessionId = crypto.randomUUID();
window.dataLayer = []
window.dataLayer.push = (...args) => {
    Array.prototype.push.apply(window.dataLayer, args);

    // `args` will be in the form of { event: 'xxx', param1: 'value1', param2: 'value2', ... }
    const event = args;
    event.sessionId = window.sessionId;

    const bucket = "https://s3.amazonaws.com/analytics-log";
    const name = `${window.sessionId}-${new Date().getTime()}`;
    const content = JSON.stringify(event);

    const url = `${bucket}/${name}`;
    axios.put(url, content)
        .then(res => {})
        .catch(err => {});
}

const root = createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
