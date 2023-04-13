const upload = require('express-fileupload');

const globalUtils = require('../utils');

let rspMsg = {
    message: ``
}

const fileFilter = (request, response, next) => {
    const picture = request.files.expense_file;
    const extension = picture.name.split(`.`)[1];

    if (extension === `jpg` || extension === `png` || extension === `jpeg`) {
        next();
    }
    else {
        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `Only image files are allowed`;

        return response.status(403).json(rspMsg);
    }
}

module.exports = { fileFilter };