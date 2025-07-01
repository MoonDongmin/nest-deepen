import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ForbiddenExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
