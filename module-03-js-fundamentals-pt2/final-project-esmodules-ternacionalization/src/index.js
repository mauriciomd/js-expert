import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'

import database from './../database.json'
import Person from './person.js'

DraftLog(console).addLineListener(process.stdin)

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.cyan("Vehicles") },
    { field: "kmTraveled", name: chalk.cyan("KM Traveled") },
    { field: "from", name: chalk.cyan("From") },
    { field: "to", name: chalk.cyan("To")}
  ]
}

const table = chalkTable(options, database.map(item => new Person(item).formatted("pt-BR")))
const print = console.draft(table)

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

terminal.question('Teste ', msg => console.log(msg))