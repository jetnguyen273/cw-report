const constants = require("./../utils/Constanst");

const handleResponse = async (req, res, next) => {
    try {
        res.send({
            data: res.info.data,
            status: constants.responeStatus.ok,
            message: res.info.message ? res.info.message : ""
        });
    } catch (err) {
        return res.status(500).send({
            message: "There are some error, please try again",
            status: "ERROR"
        });
    }
    return next();
};

module.exports = { handleResponse };
