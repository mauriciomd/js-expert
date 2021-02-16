'use strict';

const { watch, promises: { readFile }} = require('fs')

class File {
  watch(event, filename) {
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()

// Here, file.watch inherits the watch context
// It means that there's no showContent inside 'this'
// watch(__filename, file.watch)

// Here, we're turn explicit which context must use
// Bind returns a function with the desired context
watch(__filename, file.watch.bind(file))

