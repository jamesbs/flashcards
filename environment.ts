export type Environment = 'prod' | 'dev';

export const environment: Environment = process.env.NODE_ENV || 'dev';
