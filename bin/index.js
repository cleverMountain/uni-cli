#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const { input, select, checkbox } = require('@inquirer/prompts')
const run = require("../src/index")

program
  .version('0.8.0');

program.command('init')
  .description('初始化项目模板')
  .action(async (project) => {
    project = await input({ message: `Enter projectName`})
    const kuangjia = await select({
      message: 'Select a kuangjia',
      choices: [
        {
          name: 'vue3',
          value: 'vue3',
          description: 'use vue3',
        },
        {
          name: 'vue2',
          value: 'vue2',
          description: 'use vue2', 
        }
      ]
    })
    const language = await select({
      message: 'Select a language',
      choices: [
        {
          name: 'js',
          value: 'js',
          description: 'use ts',
        },
        {
          name: 'ts',
          value: 'ts',
          description: 'use ts',
        }
      ]
    });
    const build = await select({
      message: 'Select a build tool',
      choices: [
        {
          name: 'webpack',
          value: 'webpack',
          description: 'use webpack',
        },
        {
          name: 'vite',
          value: 'vite',
          description: 'use vite',
        }
      ]
    });
    const res = kuangjia + '_' + language + "_" + build
    run(res, project)
  });
program.command('list')
  .description('查看所有模板')
  .action(() => {
    console.log(`
      vue,
      react
    `)
  });
program.parse(process.argv);