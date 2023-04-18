import { gql } from 'apollo-boost';

export const ASSIGN_BUS = gql`
  mutation AssignBus($bookingId: ID!, $busId: ID!) {
    assignBus(input: { booking_id: $bookingId, bus_id: $busId }) {
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
`;
