import { readFile } from "../index.js";

const FILE_NAME = "./dist/03/input.txt";
const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

const doOperationString = "do()";
const dontDoOperationString = "don't()";

async function main() {
  const data: number[][] = [];
  const fileData = readFile(FILE_NAME) ?? "";

  let sum = 0;
  const results = fileData.match(regex);
  if (!results) {
    return;
  }

  let doOperation = true;
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result === doOperationString) {
      doOperation = true;
      continue;
    } else if (result === dontDoOperationString) {
      doOperation = false;
      continue;
    }
    if (!doOperation) {
      continue;
    }
    const numbers = result.match(/\d{1,3}/g) ?? [];
    const [a, b] = numbers.map(Number);
    sum += a * b;
  }

  console.log(sum);
}

await main();
