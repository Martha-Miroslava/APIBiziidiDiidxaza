const jsonwebtoken = require("jsonwebtoken");

const tokenSing = async (account) => {
    return jsonwebtoken.sign(
        {
            _id: account._id,
            role: account.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 60 * 5,
        }
    );
};

const verifyToken = async (token) => {
    token = await token.replace('Bearer ', ''); 
    const tokenVerified = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return tokenVerified;
};


module.exports = {tokenSing, verifyToken};