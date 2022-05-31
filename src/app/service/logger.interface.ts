export interface ILogger {
  print(message: string): void;
  trace(message: string): void;
  warning(message: string): void;
  error(message: string): void;
}
