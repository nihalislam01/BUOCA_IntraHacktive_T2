const crypto = require('crypto');

const generateToken = () => {
    const token = crypto.randomBytes(6).toString("hex");
    const hash = crypto.createHash("sha256").update(token).digest("hex");
    const expiration = Date.now() + 15 * 60 * 1000;
    return {token, hash, expiration};
}

module.exports = generateToken;