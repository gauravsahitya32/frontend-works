const Joi = require('joi');
const app = require('express')();
const expenseRegex = require('../Regex/expenseRegex');
const globalUtils = require('../utils');

let schema, result;
let data = {}, rspMsg = {
    message: ``
}

const expensePayloadValidator = async (request, response, next) => {
    data = {
        expense_title: request.body.title,
        expense_amount: request.body.amount,
        expense_category: request.body.category,
        budget: request.body.budget,
        expense_file: request.body.expense_file
    }

    schema = Joi.object({
        expense_title: Joi.string().regex(expenseRegex.expense_title).required(),
        expense_amount: Joi.string().regex(expenseRegex.expense_amount).required(),
        expense_category: Joi.string().regex(expenseRegex.expense_category).required(),
        budget: Joi.string().regex(expenseRegex.expense_amount).required(),
        expense_file: Joi.string().regex(expenseRegex.expense_file).optional()
    });

    result = schema.validate(data);

    if (!result.error) {
        next();
    }
    else {
        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `Form validation error`;
        rspMsg.error = result.error.details;

        return response.status(400).json(rspMsg);
    }
}

const getExpensePayloadValidator = async (request, response, next) => {
    data = {
        range: request.query.range
    }

    schema = Joi.object({
        range: Joi.string().regex(expenseRegex.expense_range).required()
    });

    result = schema.validate(data);

    if (!result.error) {
        next();
    }
    else {
        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `Form validation error`;
        rspMsg.error = result.error.details;

        return response.status(400).json(rspMsg);
    }
}

module.exports = { expensePayloadValidator, getExpensePayloadValidator };