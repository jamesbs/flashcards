export type Environment = 'prod' | 'dev' | 'test';

export const environment: Environment = process.env.NODE_ENV || 'dev';
