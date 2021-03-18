'use strict';

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')

;(async () => {
  const path = join(__dirname, '../../docs/contrato.pdf')
  const dataBuffer = await readFile(path)
  const data = await pdf(dataBuffer)

  console.log(data.text)
})()