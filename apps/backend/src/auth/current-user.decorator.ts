import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext) =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

/**
 * _data: we can pass into this decorator if we have data from the incoming call (not utilize in this case)
 * ExecutionContext: NestJS interface to description detail of the current request pipeline
 * which allow us to extract the incoming request object
 */
