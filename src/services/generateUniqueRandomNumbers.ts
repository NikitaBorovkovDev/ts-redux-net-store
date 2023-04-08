function generateUniqueRandomNumbers(
    numberOfNumbers: number,
    maxNumber: number
): number[] | undefined {
    let haveIt: number[] = [];

    if (numberOfNumbers <= 0 || maxNumber <= 0) {
        console.error("the numbers must be greater than 0");
        return;
    }

    function generateUniqueRandomNumber(maxNumber: number) {
        let random = Math.floor(Math.random() * maxNumber) + 1;

        if (!haveIt.includes(random)) {
            haveIt.push(random);
            return;
        } else if (numberOfNumbers > maxNumber && haveIt.length >= maxNumber) {
            haveIt.push(random);
            return;
        } else {
            generateUniqueRandomNumber(maxNumber);
        }
    }

    for (let i = 0; i < numberOfNumbers; i++) {
        generateUniqueRandomNumber(maxNumber);
    }

    return haveIt;
}

export default generateUniqueRandomNumbers;
