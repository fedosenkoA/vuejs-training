import { gql } from 'apollo-boost';

export const TRANSPORT_COMPANIES = gql`
  query transportCompanies {
    transportCompanies {
      id
      name
      buses {
        id
        seats
      }
    }
  }
`;
