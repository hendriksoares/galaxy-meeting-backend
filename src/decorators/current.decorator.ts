import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Current = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.travelerId;
  },
);
