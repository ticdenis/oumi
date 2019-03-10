import chalk from 'chalk';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as shell from 'shelljs';

type ProjectType = 'application' | 'service';

interface Project {
  type: ProjectType;
  name: string;
  description: string;
}

async function askProjectType(): Promise<ProjectType> {
  const answer: {projectType: string;} = await inquirer
    .prompt({
      name: 'projectType',
      type: 'list',
      choices: ['Application', 'Service', 'nothing'],
      message: 'What do you want to create?'
    });

  if (answer.projectType === 'nothing') {
    shell.echo(chalk.blue('Bye!'));
    shell.exit(0);
    return;
  }

  return answer.projectType.toLowerCase() as ProjectType;
}

async function askProjectName(): Promise<string> {
  const answer: {projectName: string;} = await inquirer
    .prompt({
      name: 'projectName',
      type: 'input',
      message: 'Name:'
    });

  return answer.projectName.toLowerCase();
}

async function askProjectDescription(): Promise<string> {
  const answer: {projectDescription: string;} = await inquirer
    .prompt({
      name: 'projectDescription',
      type: 'input',
      message: 'Description:'
    });

  return answer.projectDescription;
}

function projectExists(path: string): boolean {
  return shell.test('-e', path);
}

function buildProjectPath(project: Project): string {
  return `${shell.pwd()}/${project.type}s/${project.name}`;
}

function createProjectFromSkeleton(path: string): void {
  shell.cp('-R', `${shell.pwd()}/tools/skeleton/project`, path);
}

function updateProjectInfo(path: string, project: Project): void {
  shell.sed('-i', '{{projectType}}', project.type, `${path}/README.md`);
  shell.sed('-i', '{{projectType}}', project.type, `${path}/package.json`);

  shell.sed('-i', '{{projectName}}', project.name, `${path}/README.md`);
  shell.sed('-i', '{{projectName}}', project.name, `${path}/package.json`);

  shell.sed('-i', '{{projectDescription}}', project.description, `${path}/README.md`);
  shell.sed('-i', '{{projectDescription}}', project.description, `${path}/package.json`);
}

function addProjectToWorkspace(project: Project): void {
  const path = `${shell.pwd()}/package.json`;
  const workspace = `${project.type}s/${project.name}`;

  const packageJson: {workspaces: string[]} = JSON.parse(fs.readFileSync(path, 'utf8'));

  packageJson.workspaces.push(workspace);
  packageJson.workspaces.sort();

  const data = JSON.stringify(packageJson, null, 2);

  fs.writeFileSync(path, data);
}

export default async function () {
  const project: Project = {
    type: await askProjectType(),
    name: await askProjectName(),
    description: await askProjectDescription()
  };

  const path = buildProjectPath(project);

  if (projectExists(path)) {
    shell.echo(chalk.yellow('Project already exists!'));

    shell.exit(1);
    return;
  }

  createProjectFromSkeleton(path);

  updateProjectInfo(path, project);

  shell.echo(chalk.green('Created!'));

  addProjectToWorkspace(project);

  shell.exit(0);
}
