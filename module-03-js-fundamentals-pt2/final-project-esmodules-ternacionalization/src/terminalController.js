import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'readline'

import Person from './person.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
    this.terminal = {}
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    this.initializeTable(database, language)
  }

  updateTerminal(item) {
    const options = this.getTableOptions()
    this.data.push(item)
    this.print(chalkTable(options, this.data))
  }

  closeTerminal() {
    this.terminal.close()
  }

  initializeTable(database, language) {
    const options = this.getTableOptions()
    const data = database.map(item => new Person(item).formatted(language))
    const table = chalkTable(options, data)

    this.print = console.draft(table)
    this.data = data
  }

  question(message) {
    return new Promise(resolve => this.terminal.question(message, resolve))
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("KM Traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To")}
      ]
    }
  }
}