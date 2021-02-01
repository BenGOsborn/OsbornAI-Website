import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const app = express();
const PORT = process.env.PORT || 8000;

app.use('^/$', (req, res, next) => {
    const index = path.resolve('./build/index.html');

    fs.readFile(index, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Server encountered an error: ${err}`);
            return res.status(500).send('Server encountered an error!');
        }

        const context = {};
        const location = req.url;
        const content = ReactDOMServer.renderToString(
            <StaticRouter location={location} context={context}>
                <App />
            </StaticRouter>
        );

        const html = data.replace(
            '<div id="root"></div>',
            `<div id="root">${content}</div>`,
        );

        return res.send(html);
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});