import { gql } from 'apollo-boost';

export const GET_GUIDES_LIST = gql`
  query guides {
    guides(first: 999) {
      data {
        id
        user {
          id
          first_name
          last_name
          email
          phone_number
          avatar
        }
        rates {
          id
          type
          charge
        }
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
    }
  }
`;

export const CREATE_GUIDE = gql`
  mutation createGuide(
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
  ) {
    createGuide(
      input: {
        user: {
          create: {
            first_name: $first_name
            last_name: $last_name
            email: $email
            phone_number: $phone_number
            roles: { connect: GUIDE_ID }
          }
        }
      }
    ) {
      id
      rates {
        id
        type
        charge
      }
      user {
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

export const UPDATE_GUIDE = gql`
  mutation updateGuide(
    $id: ID!
    $user_id: ID!
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
  ) {
    updateGuide(
      input: {
        id: $id
        user: {
          update: {
            id: $user_id
            first_name: $first_name
            last_name: $last_name
            email: $email
            phone_number: $phone_number
          }
        }
      }
    ) {
      id
      rates {
        id
        type
        charge
      }
      user {
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
export const SET_GUIDE_RATE = gql`
  mutation setGuideRate(
    $rate_type: GuideRateTypes!
    $guide_id: ID!
    $charges: [SetGuideRateChargeInput!]!
  ) {
    setGuideRate(
      input: { rate_type: $rate_type, guide_id: $guide_id, charges: $charges }
    ) {
      id
      user {
        id
        first_name
        last_name
        email
        phone_number
        avatar
      }
      rates {
        id
        type
        charge
        rate {
          id
        }
      }
    }
  }
`;
