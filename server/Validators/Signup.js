const joi = require('joi');

const signupRegex = require('../Regex/signupRegex');
const globalUtils = require('../utils');

let data = {};
let schema, result;
let rspMsg = {
    message: ``
}

const signupValidator = (request, response, next) => {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;

    data = {
        name: name,
        email: email,
        password: password
    }

    schema = joi.object({
        name: joi.string().regex(signupRegex.name).required(),
        email: joi.string().regex(signupRegex.email).required(),
        password: joi.string().regex(signupRegex.password).required()
    });

    result = schema.validate(data);

    if (!result.error)
        next();
    else {
        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `Form validation error`;
        rspMsg.error = result.error.details;

        return response.status(400).json(rspMsg);
    }
}

module.exports = { signupValidator };