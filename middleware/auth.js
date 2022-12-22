const jwt = require("jsonwebtoken");
// const requestIp = require("request-ip");

const requestIp = require("@supercharge/request-ip");

const constants = require("./../utils/Constanst");

const userService = require("./../modules/UserModule/services/UserService");

const verifyToken =
    (roles, permissions = []) =>
    async (req, res, next) => {
        try {
            const authorizationHeader = req.headers["x-access-token"];
            const publicIp = req.headers["x-public-ip"];
            const acb = req.headers["x-location-href"]
                ? req.headers["x-location-href"].split("/")
                : "";
            const screen = acb[acb.length - 1];

            // const privateIp1 = requestIp.getClientIp;
            console.log(authorizationHeader);
            const token = authorizationHeader.split(" ")[1];

            if (!token) {
                return res
                    .status(403)
                    .send("A token is required for Authorization");
            }
            const decoded = jwt.verify(token, constants.SECRET_KEY);
            const foundUser = await userService.getUser(decoded.email);
            if (!foundUser) {
                return res
                    .status(403)
                    .send({ message: "User not found", status: "ERROR" });
            }
            if (!roles.includes(foundUser.user_role)) {
                return res
                    .status(403)
                    .send({ message: "No permission", status: "ERROR" });
            }

            if (permissions.length > 0) {
                const userPermissions = [];
                foundUser.permissions.forEach((item) =>
                    userPermissions.push(item.name)
                );
                const found = permissions.some(
                    (r) => userPermissions.indexOf(r) >= 0
                );
                if (!found) {
                    return res
                        .status(403)
                        .send({ message: "No permission", status: "ERROR" });
                }
            }

            if (req.ip && req.ip.includes(":")) {
                req.privateIp = req.ip.split(":")[3];
            } else {
                req.privateIp = req.ip;
            }
            if (!req.privateIp) {
                req.privateIp = req.ip;
            }
            // privateIp = privateIp1;
            req.user = decoded;
            req.publicIp = publicIp;
            req.screen = screen;
            // req.privateIp = privateIp; //addresses[0]; //privateIp; getClientIp
        } catch (err) {
            return res.status(401).send({
                message: err.message ? err.message : "invalid token",
                status: "ERROR"
            });
        }
        return next();
    };

module.exports = { verifyToken };
