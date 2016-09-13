import { join } from 'path'

export const paths: { [key: string]: any } = {}

paths['project'] = join(__dirname, '../')
paths['app'] = join(paths['project'], './src')
paths['dist'] = join(paths['project'], './dist')
