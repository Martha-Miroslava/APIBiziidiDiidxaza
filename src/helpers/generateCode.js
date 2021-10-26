const generateCode = () => {
    var numberPossibilities = 1000000 - 100000;
    var numberRandom = Math.random() * (numberPossibilities + 1);
    numberRandom = Math.floor(numberRandom);
    return 100000 + numberRandom;
};

module.exports = {generateCode};