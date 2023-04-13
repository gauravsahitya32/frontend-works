const bcrypt = require('bcrypt');

const Signup = require('../Model/Signup');
const globalUtils = require('../utils');

let rspMsg = {
    message: ``
}
let user;

const signupUser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt(Number.parseInt(process.env.SALT));
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        user = await new Signup({
            name: request.body.name,
            email: request.body.email,
            password: hashedPassword
        }).save();

        if (user) {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `User created`;

            return response.status(200).json(rspMsg);
        }
        else {
            globalUtils.respCleaner(rspMsg);
            rspMsg.message = `Couldn't create user at this time`;

            return response.status(503).json(rspMsg);
        }
    } catch (error) {
        console.log(`Error occured inside signupUser endpoint method\n${error}`);

        globalUtils.respCleaner(rspMsg);
        rspMsg.message = `An error occured`;

        return response.status(500).json(rspMsg);
    }

}

module.exports = { signupUser }