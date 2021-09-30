const jsonwebtoken = require('jsonwebtoken')

const tokenSign = async (accounts) => {
    return jsonwebtoken.sign(
        {
            _id: accounts._id,
            role: accounts.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 60 * 5,
        }
    );
}

const verifyToken = async (token) => {
    const tokenVerified = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return tokenVerified;
}

const decodeSign = (token) => {
    const decoded = jsonwebtoken.decode(token, null);
    return decoded;
}

module.exports = { tokenSign, decodeSign, verifyToken }