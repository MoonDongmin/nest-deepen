import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class QueryFailedExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
