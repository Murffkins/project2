// Added validation for L06
const validator = require('../helpers/validate');

const saveGame = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        genre: 'string',
        console: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveUser = (req, res, next) => {
    const validationRule = {
        userName: 'required|string',
        password: 'required|string',
        email: 'required|email',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveGame, saveUser
};