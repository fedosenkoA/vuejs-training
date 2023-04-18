import { gql } from 'apollo-boost';

export const GUIDES = gql`
  query guides {
    guides(first: 999) {
      data {
        id
        user {
          id
          first_name
          last_name
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
