import { join } from 'path'

export const paths: { [key: string]: string } = {}

paths['project'] = join(__dirname, '../')
paths['app'] = join(paths['project'], './src')
paths['dist'] = join(paths['project'], './dist')
