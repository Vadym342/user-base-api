import { config } from 'dotenv';
import { Params } from 'nestjs-pino';
import pino from 'pino';
import { v4 as uuidV4 } from 'uuid';

config();

export const loggerConfig: Params = {
  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport: process.env.PRETTY_LOGS === 'true' ? { target: 'pino-pretty' } : undefined,
    genReqId: () => uuidV4(),
    redact: {
      censor: '[censored]',
      paths: ['req.headers.authorization'],
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    serializers: {
      req: (req) => {
        return {
          id: req.id,
          method: req.method,
          url: req.url,
          params: req.params,
          query: req.query,
          headers: {
            customerid: req.headers.customerid,
            authorization: req.headers.authorization,
            accept: req.headers.accept,
          },
        };
      },
    },
  },
};
