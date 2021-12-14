const generateCode = () => {
    var numberPossibilities = 1000000 - 100000;
    var numberRandom = Math.random() * (numberPossibilities + 1);
    numberRandom = Math.floor(numberRandom);
    var numberFinal = 100000 + numberRandom;
    return numberFinal;
};

module.exports = {generateCode};
