#!/usr/bin/env node
let inputArr = process.argv.slice(2);
let helpFn = require('./commands/help')
let organizeFn = require('./commands/organize')
let treeFn = require('./commands/tree')

let command = inputArr[0]

switch (command) {
    case 'tree':
        treeFn(inputArr[1])

        break;
    case 'org':
        organizeFn(inputArr[1])

        break;
    case 'help':
        helpFn()

        break;

    default:
        console.log('invalid command provide right command')
        break;
}







