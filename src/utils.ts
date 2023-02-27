import { LogLevel } from '@nestjs/common/services/logger.service';

export const handleProcessErrors = () => {
  process.on('uncaughtException', (error) => {
    console.error(`uncaughtException: ${error.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    console.error(`unhandledRejection: ${error}`);
    process.exit(1);
  });
};

export const getLogLevels = (isProduction: boolean): LogLevel[] => {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
};

export default getLogLevels;
