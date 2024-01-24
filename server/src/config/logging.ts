import color from "colorts";

const getTimestamp = (): string => new Date().toISOString();

type LoggingType = "info" | "warn" | "error" | "debug";

export default (
  type: LoggingType,
  namespace: string,
  message: string,
  object?: any
) =>
  console[type](
    getTimestamp(),
    color(`[${type.toUpperCase()}]`).bgYellow,
    `[${namespace}] [${message}]`,
    object ? object : undefined
  );
