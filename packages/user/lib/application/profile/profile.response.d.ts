import { User } from '../../domain';
export interface ProfileResponse {
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  nickname: string;
  phone: string;
}
export declare type ProfileDataTransformer = (user: User) => ProfileResponse;
export declare const profileDataTransformer: ProfileDataTransformer;
//# sourceMappingURL=profile.response.d.ts.map
