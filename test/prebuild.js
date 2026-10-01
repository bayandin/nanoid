import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { minify } from 'terser'

export const BUILD_PATH = join(import.meta.dirname, '..', 'nanoid.js')

export async function prebuild() {
  let js = await readFile(join(import.meta.dirname, '..', 'index.browser.js'))
  let func = js.toString().match(/(export let nanoid [\W\w]*$)/)[1]
  let { code } = await minify(func)
  return code
}
