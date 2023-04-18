import { gql } from 'apollo-boost';

export const GET_GROUP_PARTICIPANTS = gql`
  query tourDetailParticipantsForGuide($group_id: ID!) {
    participantListByTicket(group_id: $group_id) {
      ticket_id
      confirmation_code
      participants {
        id
        type
        ticket_id
        is_present
        group {
          booking {
            rate {
              tour {
                id
              }
            }
          }
        }
        foodPreferences {
          foodPreference {
            id
            name
            code
          }
        }
      }
      customer {
        id
        first_name
        last_name
        email
        phone_number
      }
    }
  }
`;
export const GET_GROUPS_FOR_SWAP = gql`
  query TourBooking($id: id) {
    tourBooking(id: $id) {
      id
      booking_group_size
      rate {
        tour {
          name
        }
      }
      groups {
        id
        number
        limit
        participants {
          id
          foodPreferences {
            id
          }
        }
      }
    }
  }
`;

export const MOVE_PARTISIPANTS = gql`
  mutation moveParticipants($move_id: ID!, $to_group_id: ID!) {
    moveParticipants(input: { move_id: $move_id, to_group_id: $to_group_id }) {
      id
      type
      is_present
      ticket_id
    }
  }
`;

export const GET_FOOD_PREFERENCES = gql`
  query participantFoodPreference($id: ID!) {
    participantFoodPreference(id: $id) {
      id
      participant
      foodPreference {
        id
        name
        code
      }
    }
  }
`;
