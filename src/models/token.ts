export interface Token {
  access_token: string;
  token_expiration: string;
  refresh_token: string;
}

export interface ValidatedToken {
    status: string;
    payload: {
        sub: string;
        exp: number;
    };
}