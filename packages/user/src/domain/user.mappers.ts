import { Mapper } from '@oumi-package/shared/lib/core';

import { User } from './';

export type UserMapper<T> = Mapper<User, T>;
