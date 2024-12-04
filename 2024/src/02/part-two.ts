import { readFile } from "../index.js";

const FILE_NAME = "./dist/02/input.txt";

const Decision = {
  Increase: "Increase",
  Decrease: "Decrease",
} as const;

function checkNumber(num1: number, num2: number) {
  if (num1 === num2 || Math.abs(num1 - num2) > 3) {
    return false;
  }
  return true;
}

async function processRow(
  row: number[],
  numberOfInvalidNumbers = 0
): Promise<boolean> {
  if (numberOfInvalidNumbers > 1) {
    return Promise.resolve(false);
  }

  if (row.length === 0) {
    return Promise.resolve(false);
  }

  if (row.length === 1) {
    return Promise.resolve(true);
  }

  let leftIndex = 0;
  let rightIndex = 1;

  let firstNumber = row[leftIndex];
  let secondNumber = row[rightIndex];

  let increaseOrDecrease =
    firstNumber < secondNumber ? Decision.Increase : Decision.Decrease;
  let isRowValid = true;

  while (rightIndex < row.length) {
    firstNumber = row[leftIndex];
    secondNumber = row[rightIndex];

    if (increaseOrDecrease === Decision.Increase) {
      isRowValid = firstNumber < secondNumber;
    } else if (increaseOrDecrease === Decision.Decrease) {
      isRowValid = firstNumber > secondNumber;
    }

    const isNumberValid = checkNumber(firstNumber, secondNumber);

    if (!isNumberValid || !isRowValid) {
      numberOfInvalidNumbers++;

      if (numberOfInvalidNumbers > 1) {
        return Promise.resolve(false);
      }

      const removeLeftArray = row.filter((_, index) => index !== leftIndex - 1);
      const removeMiddleArray = row.filter((_, index) => index !== leftIndex);
      const removeRightArray = row.filter((_, index) => index !== rightIndex);

      const all = await Promise.all([
        processRow(removeLeftArray, numberOfInvalidNumbers),
        processRow(removeMiddleArray, numberOfInvalidNumbers),
        processRow(removeRightArray, numberOfInvalidNumbers),
      ]);

      if (
        numberOfInvalidNumbers <= 1 &&
        all.some((result) => result === true)
      ) {
        return Promise.resolve(true);
      }

      rightIndex++;
    } else {
      leftIndex = rightIndex;
      rightIndex++;
    }
  }

  return Promise.resolve(true);
}

async function main() {
  const data: number[][] = [];
  const fileData = readFile(FILE_NAME);

  for (const line of fileData?.split(/\r?\n/) ?? []) {
    const numbers = line.split(" ").map(Number);
    data.push(numbers);
  }

  const rowPromises = data.map(async (row): Promise<boolean> => {
    return await processRow(row);
  });

  const result = await Promise.all(rowPromises);
  const sumOfSafeLevels = result.filter(Boolean).length;

  console.log(sumOfSafeLevels);
}

await main();
