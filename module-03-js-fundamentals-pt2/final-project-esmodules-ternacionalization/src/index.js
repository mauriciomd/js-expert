import database from './../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question('Whattt?? ')
    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal()
      console.log('Terminal stopped!')
      return
    }

    const person = Person.generateInstanceFromString(answer)
    const formattedPerson = person.formatted(DEFAULT_LANGUAGE)
    
    terminalController.updateTerminal(formattedPerson)
    await save(person)

    return mainLoop()
  } catch (e) {
    console.error('Deu ruim**', e)
    return mainLoop()
  }
}

await mainLoop()