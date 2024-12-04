import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;

const targetFile = "./dist/01/input.txt";
const relativePath = path.relative(__dirname, targetFile);

export const readFile = (filename: string) => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return data;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
};
