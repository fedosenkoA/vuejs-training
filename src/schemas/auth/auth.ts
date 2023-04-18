import { gql } from 'apollo-boost';

export const SET_PASSWORD = gql`
  mutation setPassword($token: String!, $password: String!, $email: String!) {
    setPassword(input: { token: $token, password: $password, email: $email })
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken($token: String!) {
    refreshToken(input: { refreshToken: $token }) {
      token
      refresh_token
      expires_at
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      email
      roles {
        name
      }
    }
  }
`;
