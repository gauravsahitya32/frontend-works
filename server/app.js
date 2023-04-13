const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const path = require('path');

const app = express();

const globalUtils = require('./utils');
const globalRoute = require('./Routes/index');
const fileUpload = require('express-fileupload');

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload({
    limits: {
        fileSize: 1 * 1000 * 1000,
    },
    abortOnLimit: true,
    limitHandler: (request, response, next) => {
        return response.status(413).json({
            message: `File should be less than 1MB`
        });
    }
}));

app.use(globalUtils.myLogger);
app.use(globalRoute);

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`Connected to the database`);

    app.listen(process.env.PORT, () => {
        console.log(`Server is started at port number ${process.env.PORT}`);
    });
});
