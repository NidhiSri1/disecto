function validate(req, res, next) {
    const { cookies } = req;

    next();
}
module.exports = validate;
