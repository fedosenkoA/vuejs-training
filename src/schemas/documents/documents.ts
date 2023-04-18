import { gql } from 'apollo-boost';

export const CREATE_MUSEUM_TICKET = gql`
  mutation createMuseumTicket(
    $date: Date!
    $rate_id: ID!
    $museum_id: ID!
    $group_id: ID!
    $time: Time!
    $type: MuseumTicketType!
    $number: Int!
    $amount: Float!
  ) {
    createMuseumTicket(
      input: {
        date: $date
        rate_id: $rate_id
        museum_id: $museum_id
        groups: {
          group_id: $group_id
          time: $time
          type: $type
          number: $number
          amount: $amount
        }
      }
    ) {
      id
      date
      time
      number
      amount
      rate {
        id
        name
        type
        booking_group_size
        tour {
          id
          name
        }
        bookings {
          id
        }
      }
      museum {
        id
        name
      }
      group {
        id
      }
      documents {
        id
        name
        path
      }
    }
  }
`;

export const UPLOAD_DOCUMENTS = gql`
  mutation uploadDocuments(
    $documentable_id: ID!
    $documentable_type: DocumentTypes!
    $file: Upload!
  ) {
    uploadDocument(
      input: {
        documentable_id: $documentable_id
        documentable_type: $documentable_type
        file: $file
      }
    ) {
      id
    }
  }
`;
