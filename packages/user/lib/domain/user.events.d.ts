export declare type UserEvents = UserRegistered;
export interface UserRegistered {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}
export declare const userRegistered: (
  data: UserRegistered,
) => import('@oumi-package/core').Event<UserRegistered>;
//# sourceMappingURL=user.events.d.ts.map
