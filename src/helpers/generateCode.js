const generateCode = () => {
    let numberPossibilities = 1000000 - 100000;
    let numberRandom = Math.random() * (numberPossibilities + 1);
    numberRandom = Math.floor(numberRandom);
    let numberFinal = 100000 + numberRandom;
    return numberFinal;
};

module.exports = {generateCode};
