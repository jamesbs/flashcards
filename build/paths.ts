import { join } from 'path';

export const paths: { [key: string]: any } = {};

paths['project'] = join(__dirname, '../')
paths['dist'] = join(paths['project'], './src');
