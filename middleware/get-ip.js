const getIp = () => async (req, res, next) => {
    try {
        const publicIp = req.headers["x-public-ip"];

        if (req.ip && req.ip.includes(":")) {
            req.privateIp = req.ip.split(":")[3];
        } else {
            req.privateIp = req.ip;
        }

        req.publicIp = publicIp;
    } catch (err) {}
    return next();
};

module.exports = { getIp };
