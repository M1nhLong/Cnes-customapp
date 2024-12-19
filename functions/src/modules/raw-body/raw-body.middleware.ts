import { Injectable, NestMiddleware } from '@nestjs/common';
import express, { NextFunction, Request, Response } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    express.json({
      limit: '10mb',
      verify: (req, _res, buf) => {
        (req as any).rawBody = buf;
      },
    })(req, res, next);
  }
}
