import { gql } from 'apollo-boost';

export const ROUTES = gql`
  query routes {
    routes {
      id
      name
      availableDays {
        id
        date
        weekday
      }
    }
  }
`;
