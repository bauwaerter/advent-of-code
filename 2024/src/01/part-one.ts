import { readFile } from "../index.js";
import { FILE_NAME } from "./index.js";

function main() {
  const firstList: number[] = [];
  const secondList: number[] = [];
  const fileData = readFile(FILE_NAME);
  fileData?.split(/\r?\n/).forEach((line) => {
    const [first, second] = line.split(" ");
    firstList.push(parseInt(first));
    secondList.push(parseInt(second));
  });

  firstList.sort((a, b) => a - b);
  secondList.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < firstList.length; i++) {
    sum += Math.abs(firstList[i] - secondList[i]);
  }

  console.log(sum);
}

main();
