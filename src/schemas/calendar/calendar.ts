import { gql } from 'apollo-boost';

export const ADD_ASSIGN_GUIDE_TO_DATE = gql`
  mutation assignGuideToDate($guide_id: ID!, $rate_id: ID!, $dates: [Date!]!) {
    assignGuideToDate(
      input: { guide_id: $guide_id, rate_id: $rate_id, dates: $dates }
    ) {
      id
      date
      rate {
        id
        name
        type
        booking_group_size
        tour {
          id
          name
        }
      }
    }
  }
`;

export const ADD_ASSIGN_TRANSPORT_TO_DATE = gql`
  mutation assignTransportToDate(
    $transport_company_id: ID!
    $rate_id: ID!
    $dates: [Date!]!
  ) {
    assignTransportToDate(
      input: {
        transport_company_id: $transport_company_id
        rate_id: $rate_id
        dates: $dates
      }
    ) {
      id
      date
      rate {
        id
        name
        type
        booking_group_size
        tour {
          id
          name
        }
      }
    }
  }
`;

export const ADD_ASSIGN_GUIDE = gql`
  mutation assignGuidee($group_id: ID!, $guide_id: ID!) {
    assignGuideRequest(input: { group_id: $group_id, guide_id: $guide_id }) {
      id
      decision
      group {
        id
        booking {
          rate {
            id
            name
            tour {
              id
              name
            }
          }
        }
      }
      requestable {
        __typename
        ... on Guide {
          user {
            first_name
            last_name
          }
        }
      }
    }
  }
`;
