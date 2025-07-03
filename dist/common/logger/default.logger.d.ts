import { ConsoleLogger } from '@nestjs/common';
export declare class DefaultLogger extends ConsoleLogger {
    warn(message: any, ...rest: unknown[]): void;
    error(message: unknown, ...rest: unknown[]): void;
}
