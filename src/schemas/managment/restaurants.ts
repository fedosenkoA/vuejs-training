import { gql } from 'apollo-boost';

export const GET_RESTAURANTS_LIST = gql`
  query restaurants {
    restaurants {
      id
      name
      address
      unavailable_days
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

export const ADD_NEW_RESTAURANT = gql`
  mutation createRestaurant(
    $name: String!
    $address: String!
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
  ) {
    createRestaurant(
      input: {
        name: $name
        address: $address
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

export const UPDATE_RESTAURANT = gql`
  mutation updateRestaurant(
    $id: ID!
    $name: String!
    $address: String!
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
  ) {
    updateRestaurant(
      input: {
        id: $id
        name: $name
        address: $address
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
