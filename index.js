#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const cmd = require('node-cmd');

const CURR_DIR = process.cwd();
const TEMPLATE_PATH = `${__dirname}/template`;

const QUESTIONS = [
	{
		name: 'project-name',
		type: 'input',
		message: 'Project name:',
		validate: function (input) {
			if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
		}
	}
];

function createDirectoryContents (newTemplatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(newTemplatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${newTemplatePath}/${file}`;
    
    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
      
      // recursive call
      createDirectoryContents(`${newTemplatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}


inquirer.prompt(QUESTIONS)
	.then(answers => {
    const projectName = answers['project-name']		

		fs.mkdirSync(`${CURR_DIR}/${projectName}`);
		createDirectoryContents(TEMPLATE_PATH, projectName);
		console.log('\x1b[36m%s\x1b[0m', `Project ${projectName} created successfully`);
		console.log('\x1b[33m%s\x1b[0m', 'Installing npm packages');
		cmd.get(
			`cd ${CURR_DIR}/${projectName} && npm install`,
			(err, data, stderr) => {
				console.log('\x1b[36m%s\x1b[0m', 'Npm packages installed successfully');
				console.log('\x1b[33m%s\x1b[0m', 'Installing elm packages');
				cmd.get(
					`cd ${CURR_DIR}/${projectName} && elm make`,
					(err, data, stderr) => {
						console.log('\x1b[36m%s\x1b[0m', 'Elm packages installed successfully');
					}
				)
			}
		);
	});
