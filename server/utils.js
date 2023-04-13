const jwt = require('jsonwebtoken');

const Login = require('./Model/Login');
let receivedCredentials, token, loggedUser;

const myLogger = (req, res, next) => {
    console.log(`\n----------------------------------------------------------------------------------`);
    console.log(`login time: ${new Date()}, Request : ${req.url}, Requested method : ${req.method}`);

    let err;

    if (req.method == 'GET') {
        next();
    }
    else if (req.method == 'POST') {
        next();
    }
    else if (req.method == 'PATCH') {
        next();
    }
    else if (req.method == 'DELETE') {
        next();
    }
    else if (req.method == 'PUT')
        next();
    else {

        err = {
            msg: `api is not ${req.method} compatible`
        }

        return res.send(err);
    }
}

const respCleaner = (respMsg = {}) => {

    if (Object.keys(respMsg).length > 0) {
        for (let keys in respMsg)
            delete respMsg[keys];

        return respMsg;
    }
    else
        return null;

}

const requestAuthenticator = async (request, key) => {
    try {
        token = request.headers.authorization;

        if (token) {
            receivedCredentials = jwt.verify(token, key);
            loggedUser = await Login.findOne({
                email: receivedCredentials.email
            });

            return loggedUser;
        }
        else
            throw new Error(`Token missing`);
    } catch (error) {

        console.log(`Error occured inside requestAuthenticator utils method\n${error}`);
        if (error instanceof jwt.TokenExpiredError)
            throw error;

        throw error;

    }
}

module.exports = { myLogger, respCleaner, requestAuthenticator };