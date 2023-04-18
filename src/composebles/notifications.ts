import apolloClient from '../services/graphql';
import { usePageToasts } from './use-toast';
import { GET_NOTIFICATIONS } from '../schemas/notofications/notifications';

export interface Notification {
  id: number;
  notification: {
    datetime?: string;
    tour_name?: string;
    group_number?: number;
    museum_name?: string;
    __typename: string;
  };
  seen: boolean;
  __typename: string;
}

interface Notifications {
  getNotificationList: () => void;
  addNotification: (form: Notification) => void;

  watchNotifications: () => void;
}

const { addToast } = usePageToasts();

export const useNotifications = (): Notifications => {
  const getNotificationList = async () => {
    return await apolloClient
      .query({
        query: GET_NOTIFICATIONS,
      })
      .then((response) => {
        if (response.data.myNotifications.data.length) {
          const random = Math.floor(Math.random() * 10);
          addNotification(response.data.myNotifications.data[random]);
          // response.data.myNotifications.data.forEach(
          //   (notification: Notification) => {
          //     if (!notification?.seen) addNotification(notification);
          //   }
          // );
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
  };

  const addNotification = (notification: Notification) => {
    // const toast = buildNotification(notification);
    // addToast({
    //   title: toast?.title ?? 'Notification',
    //   text: toast?.message ?? '',
    // });
  };

  const watchNotifications = () => {
    setInterval(() => {
      getNotificationList();
    }, 60000);
  };

  const buildNotification = (notification: Notification) => {
    switch (notification.notification.__typename) {
      case 'NoGuideAssignedNotification':
        return {
          title: 'No guide assigned',
          message: `No guide assigned to tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'NoTransportAssignedNotification':
        return {
          title: 'No transport assigned',
          message: `No transport assigned to tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'NoDriverAssignedNotification':
        return {
          title: 'No driver assigned',
          message: `No driver assigned to tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'NoRouteAssignedNotification':
        return {
          title: 'No route assigned',
          message: `No route assigned to tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'SagradaTicketsNotLinkedNotification':
        return {
          title: 'Sagrada Familia tickets not linked',
          message: `Sagrada Familia tickets not linked to tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'ParkGuellTicketsNotLinkedNotification':
        return {
          title: 'Park Guell tickets not linked',
          message: `Park Guell tickets not linked to tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'MontserratTicketsNotLinkedNotification':
        return {
          title: 'Montserrat tickets not linked',
          message: `Montserrat tickets not linked to tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'TicketsPrepaidNotification':
        return {
          title: 'Tickets prepaid',
          message: `Tickets prepaid for tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'GuideAssignRequestNotification':
        return {
          title: 'Guide assign request',
          message: `Guide assign request for tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'GuideRequestAcceptNotification':
        return {
          title: 'Guide request accepted',
          message: `Guide request accepted for tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'GuideRequestDeclineNotification':
        return {
          title: 'Guide request declined',
          message: `Guide request declined for tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'DriverAssignRequestNotification':
        return {
          title: 'Driver assign request',
          message: `Driver assign request for tour ${notification.notification.tour_name} on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
      case 'TourStartedNotification':
        return {
          title: 'Tour started',
          message: `Tour ${notification.notification.tour_name} started on ${notification.notification.datetime} for group ${notification.notification.group_number}`,
        };
    }
  };

  return {
    getNotificationList,
    addNotification,
    watchNotifications,
  };
};
