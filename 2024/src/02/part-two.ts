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

async function processRow(row: number[]): Promise<boolean> {
  if (row.length === 0) {
    return Promise.resolve(false);
  }

  if (row.length === 1) {
    return Promise.resolve(true);
  }

  let increaseOrDecrease = null;
  let isRowValid = true;
  let numberOfInvalidNumbers = 0;
  for (let i = 0; i < row.length - 1; i++) {
    const firstNumber = row[i];
    const secondNumber = row[i + 1];

    if (increaseOrDecrease === null) {
      increaseOrDecrease =
        firstNumber < secondNumber ? Decision.Increase : Decision.Decrease;
    }

    if (increaseOrDecrease === Decision.Increase) {
      isRowValid = firstNumber < secondNumber;
    } else if (increaseOrDecrease === Decision.Decrease) {
      isRowValid = firstNumber > secondNumber;
    }

    const isNumberValid = checkNumber(firstNumber, secondNumber);

    if (!isNumberValid || !isRowValid) {
      numberOfInvalidNumbers++;
    }

    if ((!isNumberValid || !isRowValid) && numberOfInvalidNumbers > 1) {
      return Promise.resolve(false);
    }
  }

  return Promise.resolve(isRowValid && numberOfInvalidNumbers <= 1);
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
