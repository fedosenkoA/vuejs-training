import { gql } from 'apollo-boost';

export const WHERE_TOUR_BOOKINGS = gql`
  query whereTourBookings(
    $startDate: Mixed!
    $endDate: Mixed!
    $types: Mixed!
  ) {
    tourBookings(
      where: {
        AND: [
          { column: START_DATETIME, operator: GTE, value: $startDate }
          { column: END_DATETIME, operator: LTE, value: $endDate }
        ]
      }
      hasRate: { AND: [{ column: TYPE, operator: IN, value: $types }] }
      first: 999
    ) {
      data {
        id
        start_datetime
        end_datetime
        meeting_location
        meeting_time
        booking_group_size
        closed_out
        sold_out
        transportCompany {
          id
          name
        }
        requests {
          decision
          requestable {
            __typename
            ... on TransportCompany {
              name
            }
          }
        }
        transportBus {
          id
          seats
        }
        rate {
          id
          name
          type
          tour {
            id
            name
          }
        }
        groups {
          id
          number
          limit
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
    }
  }
`;
