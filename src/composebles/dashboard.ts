import apolloClient from '../services/graphql';
import { DeepReadonly, readonly, ref } from 'vue';
import { gql } from 'apollo-boost';
import * as Observable from 'zen-observable-ts';
import { UPDATE_MEETING_INFORMATION } from '../schemas/dashboard/mutations/update-meeting-information';
import { WHERE_TOUR_BOOKINGS } from '../schemas/dashboard/queries/where-tour-bookings';
import { ASSIGN_BUS } from '../schemas/dashboard/mutations/assign-bus';
import { WHERE_TICKET_TOUR_BOOKINGS } from '../schemas/dashboard/queries/where-ticket-tour-bookings';
import { ROUTES } from '../schemas/dashboard/queries/routes';
import { GUIDES } from '../schemas/dashboard/queries/guides';
import { TRANSPORT_COMPANIES } from '../schemas/dashboard/queries/transport-companies';
import { TOURS } from '../schemas/dashboard/queries/tours';
import { SET_ROUTE } from '../schemas/dashboard/mutations/set-route';

export interface Participant {
  id: number;
}

export interface GuideInfo {
  id?: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    avatar?: string;
  };
}

export interface RouteInfo {
  id?: number;
  name: string;
  availableDays: Array<RouteAvailableDay>;
}

export interface RouteAvailableDay {
  id: number;
  date: string;
  weekday: number;
}

export interface TransportCompany {
  id: string;
  name: string;
  buses: Bus[];
}

export interface Bus {
  id: number;
  seats: number;
  type: number;
}

export interface Group {
  id: number;
  number: number;
  guide: GuideInfo;
  transportCompany: TransportCompany;
  participants: Array<Participant>;
}

export interface TourBooking {
  id: string;
  start_datetime: string;
  end_datetime: string;
  meeting_location: string;
  meeting_time: string;
  booking_group_size: number;
  closed_out?: boolean;
  sold_out?: boolean;
  rate: {
    id: number;
    name: string;
    type: string;
    tour: TourName;
  };
  groups: Array<Group>;
  open?: boolean;
}

export interface TourName {
  id: number;
  name: string;
}

export interface ModalData {
  type: string;
  header?: string;
  text?: string;
  tour_id?: number;
  group_id?: number;
  tour_booking_id?: number;
}

export interface FilterDashboard {
  selectedType?: string;
  startDate?: string;
  endDate?: string;
  groupId?: number;
}

const filterDashboard = ref<FilterDashboard>({
  selectedType: '',
  startDate: '',
  endDate: '',
  groupId: 0,
});

export interface TourList {
  globalDashboardList: DeepReadonly<typeof globalDashboardList>;
  globalGuides: DeepReadonly<typeof globalGuides>;
  globalRoutes: DeepReadonly<typeof globalRoutes>;
  globalBusCompanies: DeepReadonly<typeof globalBusCompanies>;
  globalBusTypes: DeepReadonly<typeof globalBusTypes>;
  loading: DeepReadonly<typeof loading>;
  modalLoading: DeepReadonly<typeof modalLoading>;
  showModalWindow: DeepReadonly<typeof showModalWindow>;
  modalData: DeepReadonly<typeof modalData>;
  getTransportCompanies: () => Promise<void>;
  getGuides: () => Promise<void>;
  getRoutes: () => Promise<void>;
  getTourList: (
    filter: FilterDashboard
  ) => Observable.ZenObservable.Subscription;
  getTourListByConfirmationCode: (
    confirmationCode: string
  ) => Observable.ZenObservable.Subscription;
  getTourNames: () => Promise<void>;
  filter: (selectedType: string, startDate: string, endDate: string) => void;
  clearFilter: () => void;
  openAll: (isRowsOpen: boolean) => boolean;
  openRow: (id: string) => void;
  setModalData: (date: ModalData) => void;
  unsetModalData: () => void;
  setMeetingLocation: (id: number, location: string, time: string) => void;
  setGuideForGroup: (id: number, guideId: number) => void;
  setRouteForGroup: (group_id: number, route_id: number) => void;
  setBusCompany: (id: number, busCompanyId: number) => void;
  setBusType: (bookingId: number, busId: number) => void;
  getTourBookingById: (id: number) => any;
}

const globalDashboardList = ref<TourBooking[]>([]);
const globalGuides = ref<GuideInfo[]>([]);
const globalRoutes = ref<RouteInfo[]>([]);
const globalBusCompanies = ref<TransportCompany[]>([]);
const globalBusTypes = ref<Bus[][]>([]);
const showModalWindow = ref(false);
const modalData = ref<ModalData>();
const modalLoading = ref(false);
const loading = ref(false);

export const useDashboard = (): TourList => {
  const getTourList = (filter: FilterDashboard) => {
    loading.value = true;

    let type = ['PRIVATE', 'REGULAR'];

    if (filter.selectedType === 'all' || !filter.selectedType) {
      type = ['PRIVATE', 'REGULAR'];
    } else {
      type[0] = filter.selectedType;
      type[1] = '';
    }

    const startDate = filter.startDate + ' 00:00:00';
    const endDate = filter.endDate + ' 23:59:59';

    return apolloClient
      .watchQuery({
        query: WHERE_TOUR_BOOKINGS,
        variables: {
          startDate: startDate,
          endDate: endDate,
          types: [type[0], type[1]],
        },
        pollInterval: 30000,
      })
      .subscribe({
        next: (response) => {
          if (response.data.tourBookings.data.length) {
            const temp = globalDashboardList.value;

            globalDashboardList.value = response.data.tourBookings.data.map(
              (booking: TourBooking) => {
                const oldBooking = temp.find((x) => x.id === booking.id);
                return {
                  ...booking,
                  open: oldBooking ? oldBooking.open : false,
                };
              }
            );
          }

          loading.value = false;
        },
      });
  };

  const getTourListByConfirmationCode = (confirmationCode: string) => {
    loading.value = true;

    return apolloClient
      .watchQuery({
        query: WHERE_TICKET_TOUR_BOOKINGS,
        variables: {
          confirmationCode: confirmationCode,
        },
        pollInterval: 30000,
      })
      .subscribe({
        next: (response) => {
          if (response.data.tourBookings.data.length) {
            globalDashboardList.value = response.data.tourBookings.data.map(
              (booking: TourBooking) => {
                return { ...booking, open: false };
              }
            );
          }

          loading.value = false;
        },
      });
  };

  const filter = (selectedType: string, startDate: string, endDate: string) => {
    filterDashboard.value = {
      selectedType: selectedType,
      startDate: startDate,
      endDate: endDate,
    };
  };

  const clearFilter = () => {
    filterDashboard.value = {
      selectedType: '',
      startDate: '',
      endDate: '',
    };
  };

  const getGuides = () => {
    return apolloClient
      .query({
        query: GUIDES,
      })
      .then((response) => {
        if (response.data.guides.data.length) {
          globalGuides.value = response.data.guides.data;
        }
      });
  };

  const getRoutes = () => {
    return apolloClient
      .query({
        query: ROUTES,
      })
      .then((response) => {
        if (response.data.routes.length) {
          globalRoutes.value = response.data.routes;
        }
      });
  };

  const getTransportCompanies = () => {
    return apolloClient
      .query({
        query: TRANSPORT_COMPANIES,
      })
      .then((response) => {
        if (response.data.transportCompanies.length) {
          globalBusCompanies.value = response.data.transportCompanies;
          globalBusCompanies.value.forEach(function (value) {
            globalBusTypes.value[parseInt(value.id)] = value.buses;
          });
        }
      });
  };

  const getTourNames = () => {
    return apolloClient
      .query({
        query: TOURS,
      })
      .then((response) => {
        // console.log(response.data.tours.data);
      });
  };

  const setMeetingLocation = (id: number, location: string, time: string) => {
    modalLoading.value = true;
    apolloClient
      .mutate({
        mutation: UPDATE_MEETING_INFORMATION,
        variables: {
          id: id,
          location: location,
          time: time,
        },
      })
      .then((response) => {
        const bookingIndex = globalDashboardList.value.findIndex(
          (x) => typeof x.id !== 'undefined' && x.id === id.toString()
        );

        globalDashboardList.value[bookingIndex] =
          response.data.updateMeetingInformation;

        unsetModalData();
      })
      .catch(() => {
        unsetModalData();
      });
  };

  const setGuideForGroup = (group_id: number, guide_id: number) => {
    modalLoading.value = true;
    apolloClient
      .mutate({
        mutation: gql`
          mutation assignGuideRequest {
            assignGuideRequest(input: { group_id: "${group_id}", guide_id: "${guide_id}" }) {
              id
              decision
              group {
                booking {
                  rate {
                    name
                  }
                }
              }
              requestable {
                __typename
                ... on Guide {
                  user {
                    id
                    first_name
                    last_name
                    avatar
                  }
                }
              }
            }
          }
        `,
      })
      .then(() => {
        unsetModalData();
      })
      .catch(() => {
        unsetModalData();
      });
  };

  const setRouteForGroup = (group_id: number, route_id: number) => {
    modalLoading.value = true;
    apolloClient
      .mutate({
        mutation: SET_ROUTE,
        variables: {
          group_id: group_id,
          route_id: route_id,
        },
      })
      .then(() => {
        unsetModalData();
      })
      .catch(() => {
        unsetModalData();
      });
  };

  const setBusCompany = (booking_id: number, transport_company_id: number) => {
    modalLoading.value = true;
    apolloClient
      .mutate({
        mutation: gql`
          mutation assignTransport {
            assignTransportRequest(
              input: { booking_id: "${booking_id}", transport_company_id: "${transport_company_id}" }
            ) {
              id
              decision
              group {
                booking {
                  rate {
                    name
                  }
                }
              }
              requestable {
                __typename
                ... on TransportCompany {
                  name
                }
              }
            }
          }
        `,
      })
      .then(() => {
        unsetModalData();
      })
      .catch(() => {
        unsetModalData();
      });
  };

  const setBusType = (bookingId: number, busId: number) => {
    modalLoading.value = true;
    apolloClient
      .mutate({
        mutation: ASSIGN_BUS,
        variables: {
          bookingId: bookingId,
          busId: busId,
        },
      })
      .then((response) => {
        const bookingIndex = globalDashboardList.value.findIndex(
          (x) => typeof x.id !== 'undefined' && x.id === bookingId.toString()
        );

        globalDashboardList.value[bookingIndex] = response.data.assignBus;

        unsetModalData();
      })
      .catch(() => {
        unsetModalData();
      });
  };

  const setModalData = (data: ModalData) => {
    modalData.value = data;
    showModalWindow.value = true;
  };

  const unsetModalData = () => {
    modalData.value = {
      type: '',
      header: '',
      text: '',
      tour_id: 0,
      group_id: 0,
      tour_booking_id: 0,
    };
    modalLoading.value = false;
    showModalWindow.value = false;
  };

  const openRow = (id: string) => {
    globalDashboardList.value = globalDashboardList.value.map(
      (booking: TourBooking) => {
        if (booking.id === id) {
          return { ...booking, open: !booking.open };
        }
        return { ...booking, open: booking.open };
      }
    );
  };

  const openAll = (isRowsOpen: boolean) => {
    if (isRowsOpen) {
      globalDashboardList.value = globalDashboardList.value.map(
        (booking: TourBooking) => {
          return { ...booking, open: true };
        }
      );
      return false;
    } else {
      globalDashboardList.value = globalDashboardList.value.map(
        (booking: TourBooking) => {
          return { ...booking, open: false };
        }
      );
      return true;
    }
  };

  const getTourBookingById = (id: number) => {
    return globalDashboardList.value.find(
      (x) => typeof x.id !== 'undefined' && x.id === id.toString()
    );
  };

  return {
    globalDashboardList: readonly(globalDashboardList),
    globalGuides: readonly(globalGuides),
    globalRoutes: readonly(globalRoutes),
    globalBusCompanies: readonly(globalBusCompanies),
    globalBusTypes: readonly(globalBusTypes),
    loading: readonly(loading),
    modalLoading: readonly(modalLoading),
    showModalWindow: readonly(showModalWindow),
    modalData: readonly(modalData),
    getTourList,
    getTourListByConfirmationCode,
    filter,
    clearFilter,
    openRow,
    getTourBookingById,
    openAll,
    setModalData,
    unsetModalData,
    setMeetingLocation,
    setGuideForGroup,
    setRouteForGroup,
    setBusCompany,
    setBusType,
    getGuides,
    getRoutes,
    getTransportCompanies,
    getTourNames,
  };
};
