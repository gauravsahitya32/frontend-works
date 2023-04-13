const rules = {
    name: new RegExp(/((^[A-Z]{1})([a-zA-Z\s]+)$)/),
    email: new RegExp(/(^[a-zA-Z0-9._-]+)(@)(gmail.com|digimantra.com|outlook.com)$/),
    password: new RegExp(/(^[A-Z]+[a-zA-Z0-9]+)([@|$|_]+[0-9]+)([a-zA-Z0-9@$_]+$)/)
}

module.exports = rules;