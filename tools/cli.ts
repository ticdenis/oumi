#!/usr/bin/env ts-node

import * as inquirer from "inquirer";
import * as shell from "shelljs";
import createProjectScript from "./skeleton/script";
import createUseCaseScript from "./use-case/script";
import chalk from "chalk";

const options = ["New Project", "New Use Case", "exit"];

inquirer
  .prompt({
    name: "option",
    type: "list",
    choices: options,
    message: "What do you want to do?"
  })
  .then(async (answer: { option: string }) => {
    switch (answer.option) {
      case options[0]:
        createProjectScript().catch(() => {
          shell.echo(chalk.red("Ups, an occurred an error!"));
          shell.exit(1);
          return;
        });
        break;
      case options[1]:
        createUseCaseScript().catch(() => {
          shell.echo(chalk.red("Ups, an occurred an error!"));
          shell.exit(1);
          return;
        });
        break;
      // case options[2]:
      //   newAggregateScript().catch(() => {
      //     shell.echo(chalk.red("Ups, an occurred an error!"));
      //     shell.exit(1);
      //     return;
      //   });
      //   break;
      // case options[3]:
      //   newValueObjectScript().catch(() => {
      //     shell.echo(chalk.red("Ups, an occurred an error!"));
      //     shell.exit(1);
      //     return;
      //   });
      //   break;
      // case options[4]:
      //   newDomainErrorScript().catch(() => {
      //     shell.echo(chalk.red("Ups, an occurred an error!"));
      //     shell.exit(1);
      //     return;
      //   });
      //   break;
      // case options[5]:
      //   newDomainEventScript().catch(() => {
      //     shell.echo(chalk.red("Ups, an occurred an error!"));
      //     shell.exit(1);
      //     return;
      //   });
      //   break;
      default:
        shell.echo(chalk.blue("Bye!"));
        shell.exit(0);
        return;
    }
  });
