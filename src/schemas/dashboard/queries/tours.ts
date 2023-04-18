import { gql } from 'apollo-boost';

export const TOURS = gql`
  query tours {
    tours(first: 999) {
      data {
        id
        name
      }
    }
  }
`;
