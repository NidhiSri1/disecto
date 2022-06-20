module.exports = function (permittedRole) {
    return function (req, res, next) {
        const user = req.body.role;

        let isPermitted = false;

        if (permittedRole === user) {
            isPermitted = true;
        }

        if (!isPermitted) {
            res.status(403).send({ message: "Permission denied" });
        } else {
            return next();
        }
    };
};
