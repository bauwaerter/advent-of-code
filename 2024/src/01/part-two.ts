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

  let sum = 0;
  const mapWithCounts = new Map<number, number>();
  for (let i = 0; i < firstList.length; i++) {
    let count = 0;
    const numberToCount = firstList[i];
    if (mapWithCounts.has(numberToCount)) {
      count = mapWithCounts.get(numberToCount) ?? 0;
    } else {
      for (let j = 0; j < secondList.length; j++) {
        if (numberToCount === secondList[j]) {
          count++;
        }
      }
      mapWithCounts.set(numberToCount, count);
    }

    sum += numberToCount * count;
  }

  console.log(sum);
}

main();
