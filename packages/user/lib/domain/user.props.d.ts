import { StringVO, UuidVO } from '@oumi-package/core';
export declare type UserEmail = StringVO;
export declare type UserFirstname = StringVO;
export declare type UserId = UuidVO;
export declare type UserLastname = StringVO;
export declare type UserNickname = StringVO;
export declare type UserPassword = StringVO;
export declare type UserPhone = StringVO;
export declare const userEmailVO: (
  value: string,
) => import('@oumi-package/core').ValueObject<string>;
export declare const userFirstnameVO: (
  value: string,
) => import('@oumi-package/core').ValueObject<string>;
export declare const userIdVO: (
  value?: string,
) => import('@oumi-package/core').ValueObject<string>;
export declare const userLastnameVO: (
  value: string,
) => import('@oumi-package/core').ValueObject<string>;
export declare const userNicknameVO: (
  value: string,
) => import('@oumi-package/core').ValueObject<string>;
export declare const userPasswordVO: (
  value: string,
  encrypt?: boolean,
) => import('@oumi-package/core').ValueObject<string>;
export declare const userPhoneVO: (
  value: string,
) => import('@oumi-package/core').ValueObject<string>;
//# sourceMappingURL=user.props.d.ts.map
