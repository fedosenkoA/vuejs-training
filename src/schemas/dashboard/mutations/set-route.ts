import { gql } from 'apollo-boost';

export const SET_ROUTE = gql`
  mutation setRoute($group_id: ID!, $route_id: ID!) {
    setRoute(input: { group_id: $group_id, route_id: $route_id }) {
      id
      number
      limit
      booking {
        id
      }
      route {
        id
        name
      }
      guide {
        user {
          id
          first_name
          last_name
          avatar
        }
      }
      participants {
        id
        type
        is_present
      }
      museumTickets {
        id
        type
        number
        museum {
          name
        }
      }
    }
  }
`;
