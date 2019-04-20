import chalk from "chalk";
import * as inquirer from "inquirer";
import * as shell from "shelljs";

const PACKAGED_IGNORED = ["shared"];

interface UseCase {
  type: "command" | "query";
  name: {
    kebabCase: string; // kebab-case
    pascalCase: string; // PascalCase
    camelCase: string; // camelCase
  };
  package: string;
}

function exit() {
  shell.echo(chalk.blue("Bye!"));
  shell.exit(0);
}

async function selectPackageName(
  choices: string[]
): Promise<UseCase["package"]> {
  const answer: { packageName: string } = await inquirer.prompt({
    name: "packageName",
    type: "list",
    choices: [...choices, "exit"],
    message: "Where do you want to create?"
  });

  if (answer.packageName === "exit") {
    exit();
    return;
  }

  return answer.packageName.toLowerCase() as UseCase["package"];
}

async function askUseCaseType(): Promise<UseCase["type"]> {
  const answer: { useCaseType: string } = await inquirer.prompt({
    name: "useCaseType",
    type: "list",
    choices: ["Command", "Query", "exit"],
    message: "What do you want to do?"
  });

  if (answer.useCaseType === "exit") {
    exit();
    return;
  }

  return answer.useCaseType.toLowerCase() as UseCase["type"];
}

async function askUseCaseName(): Promise<UseCase["name"]> {
  const answer: { kebabCase: string } = await inquirer.prompt({
    name: "kebabCase",
    type: "input",
    message: "Name:"
  });

  if (!/^([a-z])*(-([a-z0-9])*)*([a-z0-9])$/.test(answer.kebabCase)) {
    shell.echo(chalk.yellow("Use kebab-case format please!"));
    shell.exit(1);
    return;
  }

  const kebabCase = answer.kebabCase;
  const pascalCase = kebabCase
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1, word.length))
    .join("");
  const camelCase =
    pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1, pascalCase.length);

  return {
    camelCase,
    kebabCase,
    pascalCase
  };
}

function buildPackagePath(useCase: UseCase): string {
  return `${shell.pwd()}/packages/${useCase.package}/src/application`;
}

function copyUseCaseTemplateToPackage(path: string, useCase: UseCase): void {
  shell.cp("-R", `${shell.pwd()}/tools/use-case/_${useCase.type}`, path);
}

function addUseCaseToPackage(path: string, useCase: UseCase): void {
  const makePath = (extension: string) =>
    `${path}/_${useCase.type}/_template.${extension}.ts`;

  const opt = "-i";
  const upperRegex = /_Template/g;
  const lowerRegex = /_template/g;

  if (useCase.type === "command") {
    shell.sed(opt, upperRegex, useCase.name.pascalCase, makePath("command"));
  } else {
    shell.sed(opt, upperRegex, useCase.name.pascalCase, makePath("query"));
    shell.sed(opt, upperRegex, useCase.name.pascalCase, makePath("response"));
    shell.sed(opt, lowerRegex, useCase.name.camelCase, makePath("response"));
  }

  shell.sed(opt, upperRegex, useCase.name.pascalCase, makePath("handler"));
  shell.sed(opt, upperRegex, useCase.name.pascalCase, makePath("service"));
  shell.sed(opt, lowerRegex, useCase.name.camelCase, makePath("handler"));
  shell.sed(opt, lowerRegex, useCase.name.camelCase, makePath("service"));
}

function renameUseCaseDirectory(path: string, useCase: UseCase): void {
  shell.mv(`${path}/_${useCase.type}`, `${path}/${useCase.name.kebabCase}`);
}

function renameUseCaseFiles(path: string, useCase: UseCase): void {
  const basePath = (ext: string) =>
    `${path}/${useCase.name.kebabCase}/_template.${ext}.ts`;

  const newPath = (ext: string) =>
    `${path}/${useCase.name.kebabCase}/${useCase.name.kebabCase}.${ext}.ts`;

  if (useCase.type === "command") {
    shell.mv(basePath("command"), newPath("command"));
  } else {
    shell.mv(basePath("query"), newPath("query"));
    shell.mv(basePath("response"), newPath("response"));
  }

  shell.mv(basePath("handler"), newPath("handler"));
  shell.mv(basePath("service"), newPath("service"));
}

function updateIndex(path: string, useCase: UseCase): void {
  const indexPath = `${path}/${useCase.name.kebabCase}/index.ts`;

  shell.sed("-i", "_template", useCase.name.kebabCase, indexPath);
}

export default async function() {
  const packages = shell
    .ls(`${shell.pwd()}/packages`)
    .filter(pkg => !PACKAGED_IGNORED.includes(pkg) && pkg.indexOf(".") === -1);

  const useCase: UseCase = {
    package: await selectPackageName(packages),
    type: await askUseCaseType(),
    name: await askUseCaseName()
  };

  const path = buildPackagePath(useCase);

  copyUseCaseTemplateToPackage(path, useCase);

  addUseCaseToPackage(path, useCase);

  renameUseCaseDirectory(path, useCase);

  renameUseCaseFiles(path, useCase);

  updateIndex(path, useCase);

  shell.echo(chalk.green("Created!"));

  shell.exit(0);
}
