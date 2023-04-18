import { gql } from 'apollo-boost';

export const ADD_ROUTE = gql`
  mutation createRoute(
    $name: String!
    $weekdays: [Int!]
    $points: [CreateRoutePointsSubInput!]!
  ) {
    createRoute(
      input: {
        name: $name
        available_days: { weekdays: $weekdays }
        points: $points
      }
    ) {
      id
      name
      availableDays {
        date
        weekday
      }
      points {
        id
        time
        pointable {
          __typename
          ... on Restaurant {
            name
          }
        }
      }
    }
  }
`;

export const ADD_ROUTE_WITH_EXCEPTION = gql`
  mutation createRoute(
    $name: String!
    $date: Date
    $points: [CreateRoutePointsSubInput!]!
  ) {
    createRoute(
      input: { name: $name, available_days: { date: $date }, points: $points }
    ) {
      id
      name
      availableDays {
        date
        weekday
      }
      points {
        id
        time
        pointable {
          __typename
          ... on Restaurant {
            name
          }
        }
      }
    }
  }
`;

export const UPDATE_ROUTE = gql`
  mutation updateRoute(
    $id: ID!
    $name: String!
    $weekdays: [Int!]
    $points: [UpdateRoutePointsSubInput!]!
  ) {
    updateRoute(
      input: {
        id: $id
        name: $name
        available_days: { weekdays: $weekdays }
        points: $points
      }
    ) {
      id
      name
      availableDays {
        date
        weekday
      }
      points {
        id
        time
        pointable {
          __typename
          ... on Restaurant {
            name
          }
        }
      }
    }
  }
`;

export const UPDATE_ROUTE_WITH_EXCEPTION = gql`
  mutation updateRoute(
    $id: ID!
    $name: String!
    $date: Date
    $points: [UpdateRoutePointsSubInput!]!
  ) {
    updateRoute(
      input: {
        id: $id
        name: $name
        available_days: { date: $date }
        points: $points
      }
    ) {
      id
      name
      availableDays {
        date
        weekday
      }
      points {
        id
        time
        pointable {
          __typename
          ... on Restaurant {
            name
          }
        }
      }
    }
  }
`;

export const DELETE_ROUTE = gql`
  mutation deleteRoute($id: ID!) {
    deleteRoute(input: { id: $id }) {
      id
    }
  }
`;
