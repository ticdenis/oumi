export declare type UserEvents = UserRegistered | ProfileUpdated;
export interface UserRegistered {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}
export interface ProfileUpdated {
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}
export declare const userRegistered: (
  data: UserRegistered,
) => import('@oumi-package/core').Event<UserRegistered>;
export declare const profileUpdated: (
  data: ProfileUpdated,
) => import('@oumi-package/core').Event<ProfileUpdated>;
//# sourceMappingURL=user.events.d.ts.map
