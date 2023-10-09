import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

export default WinstonModule.createLogger({
  transports: [
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      maxsize: 10485760,
      format: format.combine(
        format.timestamp(),
        format.printf((info) => {
          return `[${info.timestamp}] ${info.stack}`;
        }),
      ),
    }),
    new transports.Console({
      format: format.combine(
        format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
        format.align(),
        format.colorize(),
        format.errors({ stack: true }),
        format.prettyPrint(),
        format.simple(),
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          return `[${info.timestamp}] ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});
