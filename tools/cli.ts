#!/usr/bin/env ts-node

import * as inquirer from "inquirer";
import * as shell from "shelljs";
import createProjectScript from "./skeleton/script";
import chalk from "chalk";

const options = ["Create a Project", "exit"];

inquirer
  .prompt({
    name: "option",
    type: "list",
    choices: options,
    message: "What do you want to do?"
  })
  .then(async (answer: { option: string }) => {
    if (answer.option === options[1]) {
      shell.echo(chalk.blue("Bye!"));
      shell.exit(0);
      return;
    }

    createProjectScript().catch(() => {
      shell.echo(chalk.red("Ups, an occurred an error!"));
      shell.exit(1);
      return;
    });
  });
