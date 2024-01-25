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
    `[${type.toUpperCase()}]`,
    `[${namespace}] [${message}]`,
    object ? object : ""
  );
