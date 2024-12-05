import { readFile } from "../index.js";

const XMAS = "XMAS";
const XMAS_REVERSED = "SAMX";
const FILE_NAME = "./dist/04/input.txt";

const checkHorizontal = (data: string[][], row: number, col: number) => {
  const startIndex = col;
  const endIndex = col + XMAS.length;
  if (endIndex > data[row].length) {
    return 0;
  }
  const stringToCheck = data[row].slice(startIndex, endIndex).join("");
  if (stringToCheck.length !== XMAS.length) {
    return 0;
  }
  const total = [
    stringToCheck === XMAS,
    stringToCheck === XMAS_REVERSED,
  ].filter(Boolean).length;
  return total;
};

const checkVertical = (data: string[][], row: number, col: number) => {
  const startIndex = row;
  const endIndex = row + XMAS.length;
  if (endIndex > data.length) {
    return 0;
  }
  let stringToCheck = "";
  for (let i = 0; i < XMAS.length; i++) {
    stringToCheck += data[startIndex + i][col];
  }
  const total = [
    stringToCheck === XMAS,
    stringToCheck === XMAS_REVERSED,
  ].filter(Boolean).length;
  return total;
};

const checkDiagonally = (data: string[][], row: number, col: number) => {
  const startIndexRow = row;
  const endIndexRow = row + XMAS.length;
  const startIndexCol = col;
  const endIndexCol = col + XMAS.length;

  if (endIndexRow > data.length || endIndexCol > data[row].length) {
    return 0;
  }

  let dataRight = "";
  let dataLeft = "";
  for (let i = 0; i < XMAS.length; i++) {
    dataRight += data[startIndexRow + i][startIndexCol + i];
    dataLeft += data[endIndexRow - i - 1][startIndexCol + i];
  }

  const total = [
    dataRight === XMAS,
    dataRight === XMAS_REVERSED,
    dataLeft === XMAS,
    dataLeft === XMAS_REVERSED,
  ].filter(Boolean).length;

  return total;
};

/**
 * need to find string XMAS
 * string can be in any direction
 */
async function main() {
  const fileData = readFile(FILE_NAME) ?? "";

  const data = fileData.split(/\r?\n/).map((line) => {
    return line.split("");
  });

  let sum = 0;
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      sum += checkHorizontal(data, row, col);
      sum += checkVertical(data, row, col);
      sum += checkDiagonally(data, row, col);
    }
  }
  console.log(sum);
}

await main();
