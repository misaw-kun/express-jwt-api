import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "pid,hostname",
})

const log = pino({
  timestamp: () => `,"time":"${dayjs().format('DD/MM->HH:mm:ss')}"`,
}, stream);

export default log;