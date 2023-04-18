import { gql } from 'apollo-boost';

export const UPDATE_MEETING_INFORMATION = gql`
  mutation UpdateMeetingInformationInput(
    $id: ID!
    $location: String!
    $time: Time!
  ) {
    updateMeetingInformation(
      input: { id: $id, location: $location, time: $time }
    ) {
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
`;
