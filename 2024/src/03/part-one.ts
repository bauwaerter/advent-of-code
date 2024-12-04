import { readFile } from "../index.js";

const FILE_NAME = "./dist/03/input.txt";
const regex = /mul\(\d{1,3},\d{1,3}\)/g;

async function main() {
  const data: number[][] = [];
  const fileData = readFile(FILE_NAME) ?? "";

  let sum = 0;
  const results = fileData.match(regex);
  if (!results) {
    return;
  }

  for (const result of results) {
    const numbers = result.match(/\d{1,3}/g) ?? [];
    const [a, b] = numbers.map(Number);
    sum += a * b;
  }

  console.log(sum);
}

await main();
