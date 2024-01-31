export interface JwtPayload {
  sub: string;
  'cognito:email': string;
  email_verified: boolean;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  email: string;
  iss: string;
}
