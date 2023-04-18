import { gql } from 'apollo-boost';

export const GET_NOTIFICATIONS = gql`
  query notifications {
    myNotifications {
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
      data {
        id
        type
        datetime
        seen
        notification {
          __typename
          ... on NoGuideAssignedNotification {
            tour_name
            datetime
          }
          __typename
          ... on NoTransportAssignedNotification {
            tour_name
            datetime
          }
          __typename
          ... on NoDriverAssignedNotification {
            tour_name
            datetime
          }
          __typename
          ... on NoRouteAssignedNotification {
            tour_name
            datetime
          }
          __typename
          ... on SagradaTicketsNotLinkedNotification {
            museum_name
            tour_name
            datetime
          }
          __typename
          ... on ParkGuellTicketsNotLinkedNotification {
            museum_name
            tour_name
            datetime
          }
          __typename
          ... on MontserratTicketsNotLinkedNotification {
            museum_name
            tour_name
            datetime
          }
          __typename
          ... on TicketsPrepaidNotification {
            tour_name
            datetime
          }
          __typename
          ... on GuideAssignRequestNotification {
            request_id
            datetime
            tour_name
            rate_type
          }
          __typename
          ... on GuideRequestAcceptNotification {
            tour_name
            datetime
            guide_first_name
            guide_last_name
          }
          __typename
          ... on GuideRequestDeclineNotification {
            tour_name
            datetime
            guide_first_name
            guide_last_name
          }
          __typename
          ... on TransportAssignRequestNotification {
            request_id
            datetime
            tour_name
            rate_type
          }
          __typename
          ... on TransportRequestAcceptNotification {
            tour_name
            datetime
            transport_company_name
          }
          __typename
          ... on TransportRequestDeclineNotification {
            tour_name
            datetime
            transport_company_name
          }
          __typename
          ... on TransportRequestDeclineNotification {
            datetime
            tour_name
          }
          __typename
          ... on AutoDistributionPerformedNotification {
            tour_name
            datetime
          }
          __typename
          ... on SwapBookingsPerformedNotification {
            tour_name
            datetime
            swap_group_id
            swap_with_group_id
          }
          __typename
          ... on TourStartedNotification {
            tour_name
            datetime
          }
          __typename
          ... on TourPresentTouristsUpdateNotification {
            tour_name
            datetime
          }
          __typename
          ... on TourFinishedNotification {
            tour_name
            datetime
          }
        }
      }
    }
  }
`;
