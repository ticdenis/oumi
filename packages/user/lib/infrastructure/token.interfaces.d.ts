import { TokenFactory, TokenReader } from '../domain';
export declare type SimpleJWTFactory = (options: {
  expiration: number;
  issuer: string;
  secret: string;
}) => TokenFactory;
export declare type SimpleJWTReader = (secret: string) => TokenReader;
export declare const simpleJWTFactory: SimpleJWTFactory;
export declare const simpleJWTReader: SimpleJWTReader;
//# sourceMappingURL=token.interfaces.d.ts.map
