import { gql } from 'apollo-boost';

export const ADD_FOOD_PREFERENCES = gql`
  mutation saveFoodPreferenceFeedback(
    $token: String!
    $food_preferences: [[Int!]!]!
  ) {
    saveFoodPreferenceFeedback(
      input: { token: $token, food_preferences: $food_preferences }
    ) {
      foodPreference {
        id
        name
        code
      }
    }
  }
`;
