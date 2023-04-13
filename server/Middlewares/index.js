const { TokenExpiredError } = require('jsonwebtoken');
const globalUtils = require('../utils');

require('dotenv/config');

let user;
let rspMsg = {
    message: ``
}

let loggedUser;

const isAuthenticatedRequest = async (request, response, next) => {
    try {
        user = await globalUtils.requestAuthenticator(request, process.env.SECRETKEY);

        if (user.isLoggedIn) {
            loggedUser = user;
            next();
        }
        else {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `User has logout`;

            return response.status(403).json(rspMsg);
        }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `Token expired`;

            return response.status(403).json(rspMsg);
        }
        else if (error.toString() === `Token missing`) {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `Token is missing`;

            return response.status(404).json(rspMsg);
        }
        else {
            console.log(`Error occured inside isAuthenticatedRequest middleware method\n${error}`);

            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `An error occured`;

            return response.status(500).json(rspMsg);
        }
    }
}

const getLoggedUserDetails = () => {
    return loggedUser;
}



module.exports = { isAuthenticatedRequest, getLoggedUserDetails };