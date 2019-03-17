import chalk from "chalk";
import * as fs from "fs";
import * as inquirer from "inquirer";
import * as shell from "shelljs";

type ProjectType = "package" | "service";

interface Project {
  type: ProjectType;
  name: string;
  description: string;
}

async function askProjectType(): Promise<ProjectType> {
  const answer: { projectType: string } = await inquirer.prompt({
    name: "projectType",
    type: "list",
    choices: ["Package", "Service", "nothing"],
    message: "What do you want to create?"
  });

  if (answer.projectType === "nothing") {
    shell.echo(chalk.blue("Bye!"));
    shell.exit(0);
    return;
  }

  return answer.projectType.toLowerCase() as ProjectType;
}

async function askProjectName(): Promise<string> {
  const answer: { projectName: string } = await inquirer.prompt({
    name: "projectName",
    type: "input",
    message: "Name:"
  });

  return answer.projectName.toLowerCase();
}

async function askProjectDescription(): Promise<string> {
  const answer: { projectDescription: string } = await inquirer.prompt({
    name: "projectDescription",
    type: "input",
    message: "Description:"
  });

  return answer.projectDescription;
}

function projectExists(path: string): boolean {
  return shell.test("-e", path);
}

function buildProjectPath(project: Project): string {
  return `${shell.pwd()}/${project.type}s/${project.name}`;
}

function createProjectFromSkeleton(project: Project, path: string): void {
  shell.cp("-R", `${shell.pwd()}/tools/skeleton/${project.type}`, path);
}

function updateProjectInfo(path: string, project: Project): void {
  shell.sed("-i", "{{name}}", project.name, `${path}/README.md`);
  shell.sed("-i", "{{name}}", project.name, `${path}/package.json`);

  shell.sed("-i", "{{description}}", project.description, `${path}/README.md`);
  shell.sed(
    "-i",
    "{{description}}",
    project.description,
    `${path}/package.json`
  );
}

export default async function() {
  const project: Project = {
    type: await askProjectType(),
    name: await askProjectName(),
    description: await askProjectDescription()
  };

  const path = buildProjectPath(project);

  if (projectExists(path)) {
    shell.echo(chalk.yellow("Project already exists!"));

    shell.exit(1);
    return;
  }

  createProjectFromSkeleton(project, path);

  updateProjectInfo(path, project);

  shell.echo(chalk.green("Created!"));

  shell.exit(0);
}
