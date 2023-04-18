import { gql } from 'apollo-boost';

export const GET_TRANSPORT_LIST = gql`
  query transport {
    transportCompanies {
      id
      name
      buses {
        id
        seats
      }
      manager {
        id
        first_name
        last_name
        email
        phone_number
      }
    }
  }
`;

export const CREATE_TRANSPORT_COMPANY = gql`
  mutation createBusCompany(
    $name: String!
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
  ) {
    createTransportCompany(
      input: {
        name: $name
        address: "some address"
        manager: {
          create: {
            first_name: $first_name
            last_name: $last_name
            email: $email
            phone_number: $phone_number
            roles: { connect: RESTAURANT_MANAGER_ID }
          }
        }
      }
    ) {
      id
      name
      manager {
        id
        first_name
        last_name
        email
        phone_number
        avatar
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
export const DELETE_TRANSPORT_COMPANY = gql`
  mutation deleteTransportCompany($id: ID!) {
    deleteTransportCompany(input: { id: $id, manager: { delete: true } }) {
      id
      name
      address
      manager {
        id
        first_name
        last_name
        email
        phone_number
        avatar
      }
    }
  }
`;

export const INVITE_USER = gql`
  mutation passwordInvitation($email: String!) {
    passwordInvitation(input: { email: $email })
  }
`;
