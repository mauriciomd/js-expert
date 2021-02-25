import { writeFile, readFile } from 'fs/promises'

export const save = async (data) => {
  // There is no __filename and __dirname when we use ESModules
  const { pathname } = new URL('./../database.json', import.meta.url)
  
  const fileContent = await readFile(pathname)
  const fileData = JSON.parse(fileContent)
  fileData.push(data)
  
  await writeFile(pathname, JSON.stringify(fileData))
}