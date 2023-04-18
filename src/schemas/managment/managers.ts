import { gql } from 'apollo-boost';

export const GET_MANAGERS_LIST = gql`
  query Managers {
    users(
      hasRole: { AND: [{ column: NAME, operator: IN, value: ["Admin"] }] }
    ) {
      data {
        id
        first_name
        last_name
        email
        phone_number
        avatar
        deleted_at
        email_verified_at
        roles {
          id
          title
          name
        }
      }
    }
  }
`;

export const ADD_NEW_ADMIN = gql`
  mutation createUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
  ) {
    createUser(
      input: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        phone_number: $phone_number
        roles: { connect: ADMIN_ID }
      }
    ) {
      id
      first_name
      last_name
      email
      phone_number
      avatar
      deleted_at
      email_verified_at
      roles {
        id
        title
        name
      }
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation updateUser(
    $id: ID!
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
  ) {
    updateUser(
      input: {
        id: $id
        first_name: $first_name
        last_name: $last_name
        email: $email
        phone_number: $phone_number
        roles: { connect: ADMIN_ID }
      }
    ) {
      id
      first_name
      last_name
      email
      phone_number
      avatar
      deleted_at
      email_verified_at
      roles {
        id
        title
        name
      }
    }
  }
`;
export const DELETE_ADMIN = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(input: { id: $id }) {
      answer
    }
  }
`;

export const INVITE_USER = gql`
  mutation passwordInvitation($email: String!) {
    passwordInvitation(input: { email: $email })
  }
`;
