import { readFile } from "../index.js";

const MAS = "MAS";
const MAS_REVERSED = "SAM";
const FILE_NAME = "./dist/04/input.txt";

const checkIfX = (data: string[][], row: number, col: number) => {
  const startIndexRow = row;
  const endIndexRow = row + MAS.length;
  const startIndexCol = col;
  const endIndexCol = col + MAS.length;

  if (endIndexRow > data.length || endIndexCol > data[row].length) {
    return 0;
  }

  let dataRight = "";
  let dataLeft = "";
  for (let i = 0; i < MAS.length; i++) {
    dataRight += data[startIndexRow + i][startIndexCol + i];
    dataLeft += data[endIndexRow - i - 1][startIndexCol + i];
  }

  const isAnX =
    (dataRight === MAS || dataRight === MAS_REVERSED) &&
    (dataLeft === MAS || dataLeft === MAS_REVERSED);

  return isAnX;
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
      if (checkIfX(data, row, col)) {
        sum++;
      }
    }
  }
  console.log(sum);
}

await main();
