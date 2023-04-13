const Expense = require('../Model/Expense');
require('dotenv/config');

const globalUtils = require('../utils');
const { isAuthenticatedRequest } = require('../Middlewares/index');

let user, expenses;

let rspMsg = {
    message: ``
}

let array = [];

const fetchExpenses = async (range, request, SECRETKEY) => {

    array = [];
    expenses = {
        title: ``,
        category: ``,
        amount: ``,
        url: ``
    };
    const todayDate = new Date();

    let dateRange = {
        currDate: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()),
        nextDate: new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() + 1)
    };

    user = await isAuthenticatedRequest(request, SECRETKEY);

    if (range === `all`) {

        user = await Expense.find({
            $and: [{
                userId: user.userId
            }, {
                createdAt: {
                    $lte: todayDate
                }
            }]
        });

        user.forEach(element => {

            expenses = {
                title: element.expense_title,
                amount: element.expense_amount,
                category: element.expense_category,
                url: element.photo_url
            }

            array.push(expenses);
        });


    }
    else if (range === `daily`) {

        user = getLoggedUserDetails();
        user = await Expense.find({
            $and: [{
                userId: user.userId
            }, {
                createdAt: {
                    $gte: dateRange.currDate
                }
            }, {
                createdAt: {
                    $lte: dateRange.nextDate
                }
            }]
        });

        user.forEach(element => {

            expenses = {
                title: element.expense_title,
                amount: element.expense_amount,
                category: element.expense_category,
                url: element.photo_url
            }

            array.push(expenses);

        });
    }
    else if (range === `weekly`) {

        dateRange.currDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7);
        dateRange.nextDate = todayDate;

        user = getLoggedUserDetails();
        user = await Expense.find({
            $and: [{
                userId: user.userId
            }, {
                createdAt: {
                    $gte: dateRange.currDate
                }
            }, {
                createdAt: {
                    $lte: dateRange.nextDate
                }
            }]
        });

        user.forEach(element => {

            expenses = {
                title: element.expense_title,
                amount: element.expense_amount,
                category: element.expense_category,
                url: element.photo_url
            }

            array.push(expenses);

        });

    }
    else {

        dateRange.currDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 30);
        dateRange.nextDate = todayDate;

        user = getLoggedUserDetails();
        user = await Expense.find({
            $and: [{
                userId: user.userId
            }, {
                createdAt: {
                    $gte: dateRange.currDate
                }
            }, {
                createdAt: {
                    $lte: dateRange.nextDate
                }
            }]
        });

        user.forEach(element => {

            expenses = {
                title: element.expense_title,
                amount: element.expense_amount,
                category: element.expense_category,
                url: element.photo_url
            }

            array.push(expenses);

        });

    }

    return array;

}

const createNewExpense = async (request, response) => {
    try {
        user = await isAuthenticatedRequest(request, process.env.SECRETKEY);
        await new Expense({
            userId: user.userId,
            expense_title: request.body.title,
            expense_amount: request.body.amount,
            budget: request.body.budget,
            photo_url: request.body.expense_file ? `/uploads/${request.body.expense_file}` : `none`,
            expense_category: request.body.category
        }).save();

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `Expense Created`;

        return response.status(200).json(rspMsg);
    } catch (error) {
        console.log(`Error occured inside createNewExpense endpoint method \n${error}`);

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `An error occured`;

        return response.status(500).json(rspMsg);
    }
}

const uploadFile = (request, response) => {
    try {

        const uploadedFile = request.files.expense_file;

        uploadedFile.mv(`./uploads/${uploadedFile.name}`, (error) => {
            if (!error) {
                globalUtils.respCleaner(rspMsg);
                rspMsg.message = `File uploaded`;
                rspMsg.fileName = uploadedFile.name;

                return response.status(200).json(rspMsg);
            }
            else {
                console.log(error);
                globalUtils.respCleaner(rspMsg);
                rspMsg.message = `Couldn't upload file`;

                return response.status(500).json(rspMsg);
            }
        });

    } catch (error) {
        console.log(`Error occured inside uploadFile endpoint method\n${error}`);

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `An error occured`;

        return response.status(500).json(rspMsg);
    }
}

const getExpenses = async (request, response) => {

    try {

        const range = request.query.range;
        array = await fetchExpenses(range, request, process.env.SECRETKEY);

        if (array.length > 0) {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `Expenses found`;
            rspMsg.expenses = array;
        }
        else {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `No expense found`;
        }

        return response.status(200).json(rspMsg);

    } catch (error) {
        console.log(`Error occured inside getExpenses endpoint method\n${error}`);

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `An error occured`;

        return response.status(500).json(rspMsg);
    }
}

module.exports = { createNewExpense, uploadFile, getExpenses };