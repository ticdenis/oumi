import { koResponse, Oumi } from '@oumi-package/core/lib';
import { TokenReader, UserId } from '@oumi-package/user';

import express from 'express';
import * as HttpStatus from 'http-status-codes';

import { SERVICE_ID } from '../../config';

export const jwtMiddleware: Oumi.Handler<
  express.RequestHandler
> = container => async (req, res, next) => {
  const tokenReader = container.get<TokenReader>(SERVICE_ID.TOKEN_READER);
  await tokenReader
    .read(req.headers.authorization)
    .fold(
      err => {
        res.status(HttpStatus.UNAUTHORIZED).json(koResponse([err]));
      },
      userId => {
        container.set<UserId>(SERVICE_ID.USER_ID, userId);
        next();
      },
    )
    .run();
};