const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Signup = require('../Model/Signup');
const Login = require('../Model/Login');

const globalUtils = require('../utils');
const { isAuthenticatedRequest } = require('../Middlewares/index');
const mails = require('../Mails/index');

require('dotenv/config');

let user, mailStatus;
let rspMsg = {
    message: ``
}

let accessToken, refreshToken;

const loginUser = async (request, response) => {
    try {

        const email = request.body.email;
        let loginStatus = false;

        user = await Signup.findOne({
            email: email
        });

        if (user) {
            loginStatus = await bcrypt.compare(request.body.password, user.password);

            if (loginStatus) {

                await Login.findOneAndUpdate({
                    email: user.email,
                    userId: user._id
                }, { $set: { isLoggedIn: true } },
                    { new: true, upsert: true });

                accessToken = jwt.sign({
                    email: user.email
                }, process.env.SECRETKEY, {
                    expiresIn: `1h`
                });
                refreshToken = jwt.sign({
                    email: user.email
                }, process.env.REFSECKEY, {
                    expiresIn: `1d`
                });

                globalUtils.respCleaner(rspMsg);
                rspMsg.message = `Login Successfull`;
                rspMsg.username = user.name;
                rspMsg.email = user.email;
                rspMsg.accessToken = accessToken;
                rspMsg.refreshToken = refreshToken;

                return response.status(200).json(rspMsg);
            }
            else {
                globalUtils.respCleaner(rspMsg);
                rspMsg.message = `Invalid Credentials`;

                return response.status(401).json(rspMsg);
            }
        }
        else {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `User does not exists`;

            return response.status(404).json(rspMsg);
        }

    } catch (error) {
        console.log(`Error occured inside loginUser endpoint method\n${error}`);

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `An error occured`;

        return response.status(500).json(rspMsg);
    }
}

const tokenRefresher = async (request, response) => {
    try {

        user = await globalUtils.requestAuthenticator(request, process.env.REFSECKEY);

        accessToken = jwt.sign({
            email: user.email
        }, process.env.SECRETKEY, {
            expiresIn: `1h`
        });

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `Token Created`;
        rspMsg.token = accessToken;

        return response.status(200).json(rspMsg);

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `Token expired`;

            return response.status(403).json(rspMsg);
        }
        else if (error.toString() === `Token missing`) {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `Token Missing`;

            return response.status(404).json(rspMsg);
        }
        else {
            console.log(`An error occured inside tokenRefresher endpoint method\n${error}`);

            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `An error occured`;

            return response.status(200).json(rspMsg);
        }
    }
}

const logoutUser = async (request, response) => {
    try {

        user = await isAuthenticatedRequest(request, process.env.SECRETKEY);
        user.isLoggedIn = false;
        await user.save();

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `Logout successfull`;

        return response.status(200).json(rspMsg);

    } catch (error) {
        console.log(`Error occured inside logoutUser endpoint method\n${error}`);

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `An error occured`;

        return response.status(500).json(rspMsg);
    }
}

const verifyAccount = async (request, response) => {
    try {
        user = await Signup.findOne({
            email: request.body.email
        });

        if (user) {
            mailStatus = await mails.sendVerificationOTP(process.env.MAILUSER.toString(), request.body.email, `Hello, we've received a request to reset your password. So, in order to verify that it is you, we've sent an OTP to you. Please enter the given OTP to confirm your identity. In case if it is not you then please ignore this email`, `Account Verification`);

            if (mailStatus) {
                console.log(mailStatus);
                globalUtils.respCleaner(rspMsg);
                rspMsg.message = `OTP Sent`;

                return response.status(200).json(rspMsg);
            }
            else {
                globalUtils.respCleaner(rspMsg);
                rspMsg.message = `Failure sending OTP`;

                return response.status(503).json(rspMsg);
            }

        }
        else {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `Account doesn't exists`;

            return response.status(404).json(rspMsg);
        }
    } catch (error) {
        console.log(`Error occured inside verifyAccount method\n${error}`);

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `An error occured`;

        return response.status(500).json(rspMsg);
    }
}

module.exports = { loginUser, tokenRefresher, logoutUser, verifyAccount };