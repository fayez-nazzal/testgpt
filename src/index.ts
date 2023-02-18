#!/usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import path from "path";
import { readJsonFile, autoTest } from "./utils.js";

program.option("-i, --inputFile <char>").option("-o, --outputFile <char>");
program.parse();

const options = program.opts();

console.log(chalk.blue("Reading testgpt.config.json..."));
const { techs, tips } = readJsonFile(
  path.join(process.cwd(), "testgpt.config.json")
);

if (!techs.length) {
  console.error(chalk.red("Please add techs to testgpt.config.json"));
  process.exit(1);
}

const inputFile = options.inputFile;

if (!inputFile) {
  console.error(chalk.red("Please provide an input file"));
  process.exit(1);
}

let outputFile = options.outputFile;

if (!outputFile) {
  const inputFileExtension = path.extname(inputFile);

  const inputFileWithoutExtension = inputFile.replace(inputFileExtension, "");

  outputFile = `${inputFileWithoutExtension}.test${inputFileExtension}`;

  console.log(chalk.blue("No output file provided, using default."));

  console.log(chalk.yellow(`Output file: ${outputFile}`));
}

autoTest({
  techs,
  tips,
  inputFile,
  outputFile,
});