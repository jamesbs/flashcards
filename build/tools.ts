import { join } from 'path'
import { paths } from './paths'

export const generatePath = (parts: TemplateStringsArray, ...values: string[]) => {
  const resolution = values.reduce<string[]>(
    (acc, value, index) => [
      ...acc,
      parts[index],
      paths[value]
    ],
    []
  )

  resolution.push(parts.slice(-1)[0])

  return join(...resolution)
}
